import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const fattoInCasaDaBenedetta = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('fattoincasadabenedetta.it/')) {
			reject(
				new Error(
					"url provided must include 'fattoincasadabenedetta.it/'"
				)
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);

					let rawRecipeName = $("meta[property='og:title']")
						.attr('content')
						.toLowerCase()
						.replace(' | fatto in casa da benedetta rossi', '');
					Recipe.name =
						rawRecipeName[0].toUpperCase() +
						rawRecipeName.substring(1);

					$('.wpurp-recipe-ingredient').each((i, el) => {
						$(el)
						.each((i, el) => {
							Recipe.ingredients.push(
								$(el)
									.text()
									.replace(/\s\s+/g, ' ')
									.replace(
										/(?<=\d)(?=[^\d\s])|(?<=[^\d\s])(?=\d)/g,
										' '
									)
									.replace(
										/\d\.\s+|[a-z]\)\s+|•\s+|[A-Z]\.\s+|[IVX]+\.\s+/g,
										''
									)
									.replace(/[•\t]+/g, '')
									.replace(' , ', ',')
									.replace(' . ', '.')
									.replace(' / ', '/')
									.replace(/\r?\n|\r/g, ' ')
									.trim()
							);
						});
					});

					$('.wpurp-recipe-instructions').each((i, el) => {
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

					$('.recipe-time-box').each((i, el) => {
						$(el)
							.find('li')
							.each((i, el) => {
								const title = $(el).find('.time-text').text();
								const data = $(el)
									.find('.time-text + span')
									.text();

								switch (title) {
									case 'Tempo di preparazione:':
										Recipe.time.prep = data;
										break;
									case 'Tempo di cottura:':
										Recipe.time.cook = data;
										break;
									default:
										break;
								}
							});
					});

					Recipe.servings = $('.advanced-adjust-recipe-servings').attr('data-original');

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

export default fattoInCasaDaBenedetta;
