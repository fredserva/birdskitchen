const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const turbigoGourmandises = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('turbigo-gourmandises.fr/')) {
			reject(
				new Error("url provided must include 'turbigo-gourmandises.fr'")
			);
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

					$('.wprm-recipe-ingredient-group').each((i, el) => {
						let group = $(el)
							.find('.wprm-recipe-group-name')
							.text();
						if (group) {
							Recipe.ingredients.push(group);
						}
						$(el)
							.find('.wprm-recipe-ingredient')
							.each((i, el) => {
								Recipe.ingredients.push(
									$(el)
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

					$('.wprm-recipe-instruction-group').each((i, el) => {
						Recipe.instructions.push(
							$(el).children('.wprm-recipe-group-name').text()
						);
						$(el)
							.find('.wprm-recipe-instruction-text')
							.each((i, elChild) => {
								Recipe.instructions.push($(elChild).text());
							});
					});

					$('.wprm-recipe-prep-time-container').each((i, el) => {
						Recipe.time.prep = $(el)
							.find('.wprm-recipe-time')
							.text()
							.trim();
					});

					$('.wprm-recipe-cook-time-container').each((i, el) => {
						Recipe.time.cook = $(el)
							.find('.wprm-recipe-time')
							.text()
							.trim();
					});

					Recipe.servings = $('.wprm-recipe-servings').text().trim();

					Recipe.tags = $('.wprm-recipe-keyword')
						.text()
						.split(',')
						.map((x) => x.trim());

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

module.exports = turbigoGourmandises;
