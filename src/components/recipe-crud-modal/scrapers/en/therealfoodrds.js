import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';
import puppeteerFetch from '../../helpers/puppeteerFetch';

const theRealFoodRds = (url) => {
	return new Promise(async (resolve, reject) => {
		if (!url.includes('therealfoodrds.com/')) {
			reject(
				new Error("url provided must include 'therealfoodrds.com/'")
			);
		} else {
			try {
				const html = await puppeteerFetch(url);
				const Recipe = new RecipeSchema();
				const $ = load(html);

				Recipe.image = $("meta[property='og:image']").attr('content');
				Recipe.name = $('.tasty-recipes-entry-header')
					.children('h2')
					.first()
					.text();

				$('.tasty-recipes-ingredients')
					.find('li')
					.each((i, el) => {
						Recipe.ingredients.push(
							$(el).text().replace(/\s\s+/g, '')
						);
					});

				$('.tasty-recipes-instructions')
					.find('h4, li')
					.each((i, el) => {
						Recipe.instructions.push(
							$(el).text().replace(/\s\s+/g, '')
						);
					});

				Recipe.tags = $('.tasty-recipes-category')
					.text()
					.split('|')
					.map((x) => x.trim());

				Recipe.time.prep = $('.tasty-recipes-prep-time').text();
				Recipe.time.cook = $('.tasty-recipes-cook-time').text();
				Recipe.time.total = $('.tasty-recipes-total-time').text();

				Recipe.servings = $('.tasty-recipes-yield')
					.children('span')
					.first()
					.text();

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

export default theRealFoodRds;
