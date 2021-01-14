import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const cuisineActuelle = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('cuisineactuelle.fr/recettes')) {
			reject(
				new Error("url provided must include 'cuisineactuelle.fr/recettes/'")
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $("meta[property='og:title']").attr(
						'content'
					).replace(' - Recettes', '');

					$('.recipeIngredients-list').each((i, el) => {
						$(el)
							.find('li')
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.text()
                                        .replace(/(?<=\d)(?=[^\d\s])|(?<=[^\d\s])(?=\d)/g, ' ')
                                        .replace(' , ', ',')
                                        .replace(' . ', '.')
                                        .replace(' / ', '/')
										.trim()
								);
							});
					});

					$('.recipe-instructionContent').each((i, el) => {
						$(el)
							.find('li')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
					});

					$('[data-block="recipe-info-time"]').each((i, el) => {
                        Recipe.time.prep = $(el).find('.recipeInfo-label').text().trim();
					});

					$('[data-block="recipe-info-cooking"]').each((i, el) => {
                        Recipe.time.cook = $(el).find('.recipeInfo-label').text().trim();
					});

					Recipe.servings = $('.recipeIngredients-yieldInput').attr(
						'value'
					);

					$('[data-block="more_recipes"]').each((i, el) => {
						$(el)
							.find('.tag-link')
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

export default cuisineActuelle;
