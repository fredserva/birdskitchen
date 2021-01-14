const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const septCentCinquanteGrammes = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('750g.com/')) {
			reject(new Error("url provided must include '750g.com'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = cheerio.load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $("meta[property='og:title']")
						.attr('content')
						.replace('Recette - ', '')
						.replace(' | 750g', '');

					$('.recipe-ingredients').each((i, el) => {
						$(el)
							.find('.recipe-ingredients-item-label')
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, '')
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

					$('.recipe-steps').each((i, el) => {
						$(el)
							.find('.recipe-steps-item')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild).text().trim()
								);
							});
					});

					Recipe.time.prep = $('[itemprop="prepTime"]')
						.text()
						.trim();
					Recipe.time.cook = $('[itemprop="cookTime"]')
						.text()
						.trim();

					Recipe.servings = $('.ingredient-variator-label')
						.text()
						.replace(' personnes', '');

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

module.exports = septCentCinquanteGrammes;
