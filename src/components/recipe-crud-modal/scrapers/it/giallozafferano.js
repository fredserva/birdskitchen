import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const gialloZafferano = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('giallozafferano.it/')) {
			reject(
				new Error("url provided must include 'giallozafferano.it/'")
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

					$('.gz-ingredients').each((i, el) => {
						$(el)
							.find('.gz-list-ingredients')
							.each((i, elChild) => {
								$(elChild)
									.find('dt, dd')
									.each((i, elGrandChild) => {
										Recipe.ingredients.push(
											$(elGrandChild)
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
					});

					$('.gz-content-recipe').each((i, el) => {
						$(el).find('.num-step').remove();
						$(el)
							.find('p')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
					});

					$('.gz-list-featured-data')
						.find('.gz-name-featured-data')
						.each((i, el) => {
							let content = $(el).text();
							let data = $(el).children('strong').text();

							if (~content.indexOf('Preparazione')) {
								Recipe.time.prep = data;
							} else if (~content.indexOf('Cottura')) {
								Recipe.time.cook = data;
							} else if ( ~content.indexOf('Dosi') ) {
								Recipe.servings = data.replace(/\D+/g, '').trim();
							}
						});

					$('.gz-cat-seo-link').each((i, el) => {
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

export default gialloZafferano;
