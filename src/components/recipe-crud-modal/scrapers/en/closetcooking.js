import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const closetCooking = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('closetcooking.com/')) {
			reject(new Error("url provided must include 'closetcooking.com/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $("meta[property='og:title']").attr(
						'content'
					);

					$('.ingredients').each((i, el) => {
						const item = $(el).text().replace(/\s\s+/g, ' ').trim();
						Recipe.ingredients.push(item);
					});

					$('.instructions').each((i, el) => {
						const step = $(el).text().replace(/\s\s+/g, '').trim();
						Recipe.instructions.push(step);
					});

					Recipe.servings = $('[itemprop="recipeYield"]')
						.text()
						.replace(/\D+/g, '')
						.trim();

					$('[itemprop="prepTime"]').each((i, el) => {
						Recipe.time.prep = $(el)
							.parent()
							.text()
							.replace('Prep Time:', '')
							.trim();
					});

					$('[itemprop="cookTime"]').each((i, el) => {
						Recipe.time.cook = $(el)
							.parent()
							.text()
							.replace('Cook Time:', '')
							.trim();
					});

					$('.entry-categories').each((i, el) => {
						$(el)
							.find('a[rel*="category"]')
							.each((i, elChild) => {
								Recipe.tags.push($(elChild).text().trim());
							});
					});

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

export default closetCooking;
