const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const herveCuisine = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('hervecuisine.com/')) {
			reject(new Error("url provided must include 'hervecuisine.com'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = cheerio.load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);

					Recipe.name = $("meta[property='og:title']").attr(
						'content'
					);

					$('.recipe-ingredient-list').each((i, el) => {
						Recipe.ingredients.push(
							$(el)
								.text()
								.replace(/\s\s+/g, '\n')
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

					$('[itemprop="recipeInstructions"]').each((i, el) => {
						Recipe.instructions.push(
							$(el)
								.text()
								.replace(/\s\s+/g, '\n')
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

					Recipe.time.prep = $('[itemprop="prepTime"]')
						.parent()
						.text()
						.trim();

					Recipe.time.cook = $('[itemprop="cookTime"]')
						.parent()
						.text()
						.trim();

					Recipe.servings = $('[itemprop="recipeYield"]')
						.find('a')
						.text()
						.replace(/\D+/g, '')
						.split(' ')[0]
						.split('-')[0]
						.trim();

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

module.exports = herveCuisine;
