import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const gnamgnam = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('gnamgnam.it/')) {
			reject(new Error("url provided must include 'gnamgnam.it/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					let originalImage = $("meta[property='og:image']").attr(
						'content'
					);
					let extension = originalImage.split('.').pop();
					let originalImageMinusExt = originalImage.substr(0, originalImage.lastIndexOf('.'));
					let lowerCaseExtension = extension.toLowerCase();
					Recipe.image = originalImageMinusExt + '.' + lowerCaseExtension;

					Recipe.name = $("meta[property='og:title']").attr(
						'content'
					);

					$('.ingredienti').each((i, el) => {
						$(el)
							.find('dt, [itemprop="ingredients"]')
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

					$('.instructions').each((i, el) => {
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

					$('.box-cat').each((i, el) => {
						$(el)
							.find('a')
							.each((i, elChild) => {
								$(elChild).find('.badge').remove();
								Recipe.tags.push($(elChild).text().trim());
							});
					});

					Recipe.servings = $('[itemprop="recipeYield"]')
						.text()
						.replace(/\D+/g, '');

					Recipe.time.prep = $('.prepTime').text();

					Recipe.time.cook = $('.cookTime').text();

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

export default gnamgnam;
