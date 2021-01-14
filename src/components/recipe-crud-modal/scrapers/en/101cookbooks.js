import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const oneHundredAndOne = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('101cookbooks.com/')) {
			reject(new Error("url provided must include '101cookbooks.com/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);
					const recipetitle = $('.recipetitle');

					Recipe.name = recipetitle.children('.entry-title').text();

					Recipe.name = $("meta[property='og:title']").attr(
						'content'
					);

					Recipe.image = $("meta[property='og:image']")
						.attr('content')
						.replace(/[?]w.*/, '');

					$('.wprm-recipe-ingredient').each((i, el) => {
						Recipe.ingredients.push(
							$(el).text().replace(/\s\s+/g, ' ').trim()
						);
					});

					$('.wprm-recipe-instruction-group').each((i, el) => {
						Recipe.instructions.push(
							$(el).children('.wprm-recipe-group-name').text()
						);
						$(el)
							.find('.wprm-recipe-instruction-text')
							.each((i, elChild) => {
								Recipe.instructions.push($(elChild).text());
							});
					});

					Recipe.time.prep = $($('.wprm-recipe-time').get(1)).text();
					Recipe.time.cook = $($('.wprm-recipe-time').get(2)).text();
					Recipe.time.total = $('.wprm-recipe-time').last().text();

					Recipe.servings = $('.wprm-recipe-time')
						.first()
						.text()
						.trim();

					if (
						!Recipe.name ||
						!Recipe.ingredients.length ||
						!Recipe.instructions.length
					) {
						reject(new Error('No recipe found on page'));
					} else {
						resolve(Recipe);
					}
				} else {
					reject(new Error('No recipe found on page'));
				}
			});
		}
	});
};

export default oneHundredAndOne;
