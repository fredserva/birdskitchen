import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const myRecipes = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('myrecipes.com/recipe')) {
			reject(
				new Error("url provided must include 'myrecipes.com/recipe'")
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $('h1.headline').text().trim();

					$('.ingredients-item').each((i, el) => {
						const ingredient = $(el)
							.text()
							.replace(/\s\s+/g, ' ')
							.trim();
						Recipe.ingredients.push(ingredient);
					});
					$($('.instructions-section-item').find('p')).each(
						(i, el) => {
							Recipe.instructions.push($(el).text());
						}
					);

					let metaBody = $('.recipe-meta-item-body');

					Recipe.time.active = metaBody.first().text().trim();
					Recipe.time.total = $(metaBody.get(1)).text().trim();
					Recipe.time.prep = metaBody.first().text().trim();
					Recipe.time.cook = $(metaBody.get(1)).text().trim();

					Recipe.servings = metaBody.last().text().replace(/\D+/g, '').trim();

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

export default myRecipes;
