import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';
import puppeteerFetch from '../../helpers/puppeteerFetch';

const seriousEats = (url) => {
	return new Promise(async (resolve, reject) => {
		if (!url.includes('seriouseats.com')) {
			reject(new Error("url provided must include 'seriouseats.com'"));
		} else if (url.includes('seriouseats.com/sponsored/')) {
			reject(
				new Error('seriouseats.com sponsored recipes not supported')
			);
		} else {
			try {
				const html = await puppeteerFetch(url);
				const Recipe = new RecipeSchema();
				const $ = load(html);

				Recipe.name = $("meta[property='og:title']").attr('content');

				Recipe.image = $("meta[property='og:image']").attr('content');

				$('.ingredient').each((i, el) => {
					const item = $(el).text();
					Recipe.ingredients.push(item);
				});

				$('.recipe-procedure-text').each((i, el) => {
					Recipe.instructions.push(
						$(el).text().replace(/\s\s+/g, '')
					);
				});

				$("li[class='label label-category top-level']").each(
					(i, el) => {
						Recipe.tags.push($(el).find('a').text());
					}
				);

				Recipe.tags = Recipe.tags.filter((item) => item);

				function onlyUnique(value, index, self) {
					return self.indexOf(value) === index;
				}

				Recipe.tags = Recipe.tags.filter(onlyUnique);

				Recipe.servings = $('.yield')
					.text()
					.replace(/\D+/g, '')
					.split(' ')[0]
					.split('-')[0];

				if (
					!Recipe.name ||
					!Recipe.ingredients.length ||
					!Recipe.instructions.length
				) {
					reject(new Error('No recipe found on page'));
				} else {
					resolve(Recipe);
				}
			} catch (error) {
				reject(new Error('No recipe found on page'));
			}
		}
	});
};

export default seriousEats;
