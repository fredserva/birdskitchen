import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const kochbar = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('kochbar.de/')) {
			reject(new Error("url provided must include 'kochbar.de/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $("meta[name='twitter:title']").attr(
						'content'
					);

                    if ( $('#ingredientNumberOfPersons').length > 0 ) {
                        Recipe.servings = $('#ingredientNumberOfPersons').text().replace(/\D/g,'');
                    } else {
                        Recipe.servings = $('.kb-recipe-calculator-input').data(
                            'ingredient-base'
                            );
                    }

					$('.kb-recipe-ingredient-table').each((i, el) => {
						$(el)
							.find('tr')
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
                    });

					$('.ks-ingredients-table').each((i, el) => {
						$(el)
							.find('tr')
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
                    });

					$('.kb-steps-wrapper').each((i, el) => {
						$(el)
							.find('.kb-recipe-steps-right-var')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild).text().trim()
								);
							});
					});

					$('.ks-preparation__step').each((i, el) => {
						$(el)
							.find('p')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild).text().trim()
								);
							});
					});

					$('section[data-tracking-id="recipe-categories-container"]').each((i, el) => {
						$(el)
							.find('.rtli-pb-small')
							.each((i, elChild) => {
								Recipe.tags.push($(elChild).text().trim());
							});
					});

					$('.ks-recipe-categories').each((i, el) => {
						$(el)
							.find('a')
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

export default kochbar;
