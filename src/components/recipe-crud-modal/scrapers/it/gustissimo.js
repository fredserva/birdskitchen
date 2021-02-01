import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const gustissimo = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('gustissimo.it/')) {
			reject(new Error("url provided must include 'gustissimo.it/'"));
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

					$('#ingredienti').each((i, el) => {
						$(el)
							.find('.ingrediente')
							.each((i, elChild) => {
								$(elChild).find('[itemprop="ingredients"]').remove();
								Recipe.ingredients.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.replace(
											/(?<=\d)(?=[^\d\s])|(?<=[^\d\s])(?=\d)/g,
											' '
										)
										.replace(/\d\.\s+|[a-z]\)\s+|•\s+|[A-Z]\.\s+|[IVX]+\.\s+/g, '')
										.replace(/[•\t]+/g, '')
										.replace(' , ', ',')
										.replace(' . ', '.')
										.replace(' / ', '/')
										.trim()
								);
							});
					});

					$('[itemprop="recipeInstructions"]').each((i, el) => {
						$(el)
							.find('.paragrafo')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
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

export default gustissimo;
