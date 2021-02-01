import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const misya = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('misya.info/ricetta/')) {
			reject(
				new Error("url provided must include 'misya.info/ricetta/'")
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

					$('.list-ingr.mb-3').each((i, el) => {
						$(el)
							.find('li')
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

					$('[name="istruzioni"]').each((i, el) => {
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

					$('.inforic')
						.find('.ori')
						.each((i, el) => {
							$(el).children('img').remove();
							let content = $(el).text();
							let data = $(el).children('span').text();

							if (~content.indexOf('preparazione')) {
								Recipe.time.prep = data;
							} else if (~content.indexOf('cottura')) {
								Recipe.time.cook = data;
							}
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

export default misya;
