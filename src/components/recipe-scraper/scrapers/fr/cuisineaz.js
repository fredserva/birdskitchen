const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const cuisineAz = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('cuisineaz.com/')) {
			reject(new Error("url provided must include 'cuisineaz.com'"));
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

					$('.ingredients').each((i, el) => {
						$(el)
							.find('li')
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

					$('.instructions').each((i, el) => {
						$(el)
							.find('p')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild).text().trim()
								);
							});
					});

					Recipe.time.prep = $(
						'#ContentPlaceHolder_LblRecetteTempsPrepa'
					)
						.text()
						.trim();

					Recipe.time.cook = $(
						'#ContentPlaceHolder_LblRecetteTempsCuisson'
					)
						.text()
						.trim();

					Recipe.servings = $('#ContentPlaceHolder_LblRecetteNombre')
						.text()
						.replace(/\D+/g, '')
						.split(' ')[0]
						.split('-')[0];

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

module.exports = cuisineAz;
