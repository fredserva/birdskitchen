const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const cuisineMoiUnMouton = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('cuisinemoiunmouton.com/')) {
			reject(
				new Error("url provided must include 'cuisinemoiunmouton.com'")
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = cheerio.load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $("meta[property='og:title']")
						.attr('content')
						.replace(' – Cuisine moi un mouton', '');

					$('.ingredients').each((i, el) => {
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

					$('.instructions').each((i, el) => {
						$(el)
							.find('li')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
					});

					$('[itemprop="prepTime"]').each((i, el) => {
						Recipe.time.prep = $(el).parent().text().replace('Temps de préparation :', '').trim();
                    });

					$('[itemprop="cookTime"]').each((i, el) => {
						Recipe.time.cook = $(el).parent().text().replace('Temps de cuisson :', '').trim();
					});

					Recipe.servings = $('[itemprop="recipeYield"]')
						.text()
						.replace(/\D+/g, '')
						.trim();

					$('.cat').each((i, el) => {
						$(el)
							.find('.penci-cat-name')
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

module.exports = cuisineMoiUnMouton;
