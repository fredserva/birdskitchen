import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const vegolosi = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('vegolosi.it/')) {
			reject(new Error("url provided must include 'vegolosi.it/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);

					Recipe.name = $('h1.post_title').text().trim();

					$('.tasty-recipe-ingredients').each((i, el) => {
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

					$('.tasty-recipe-instructions').each((i, el) => {
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

					$('.entry-tags').each((i, el) => {
						$(el)
							.find('a')
							.each((i, elChild) => {
								Recipe.tags.push($(elChild).text().trim());
							});
					});

					Recipe.servings = $('.tasty-recipes-yield')
						.text()
						.replace(/\D+/g, '');

					Recipe.time.prep = $('.tasty-recipes-prep-time').text();

					Recipe.time.cook = $('.tasty-recipes-cook-time').text();

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

export default vegolosi;
