import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const loSpicchioDaglio = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('lospicchiodaglio.it/ricetta/')) {
			reject(
				new Error("url provided must include 'lospicchiodaglio.it/ricetta/'")
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
					);

					$('[itemprop="recipeIngredient"]').each((i, el) => {
						$(el)
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.replace(
											/(?<=\d)(?=[^\d\s])|(?<=[^\d\s])(?=\d)/g,
											' '
										)
										.replace(' , ', ',')
										.replace(' . ', '.')
										.replace(' / ', '/')
										.trim()
								);
							});
					});

					$('.col-tn-12').each((i, el) => {
						$(el)
							.each((i, el) => {
								const title = $(el).find('h2').text();
								const data = $(el)
									.find('li')
									.text();

								switch (title) {
									case 'PREPARAZIONE':
										Recipe.instructions.push(data);
										break;
									default:
										break;
								}
							});
					});

					Recipe.servings = $('#persone').val();

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

export default loSpicchioDaglio;
