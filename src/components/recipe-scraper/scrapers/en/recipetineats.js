const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const recipeTinEats = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('recipetineats.com/')) {
			reject(new Error("url provided must include 'recipetineats.com/'"));
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

					$('.wprm-recipe-ingredient').each((i, el) => {
						Recipe.ingredients.push(
							$(el)
								.text()
								.replace(/\s\s+/g, ' ')
								.replace('▢', '')
								.trim()
						);
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

					Recipe.time.prep = $('.wprm-recipe-prep-time-container').find('.wprm-recipe-time').text().trim();
					Recipe.time.cook = $('.wprm-recipe-cook-time-container').find('.wprm-recipe-time').text().trim();

					Recipe.servings = $('.wprm-recipe-servings').text().trim();

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

module.exports = recipeTinEats;
