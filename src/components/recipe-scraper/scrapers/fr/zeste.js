const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const zeste = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('zeste.ca/')) {
			reject(new Error("url provided must include 'zeste.ca'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = cheerio.load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);

					Recipe.name = $("meta[property='og:title']")
						.attr('content')
						.replace(' | Zeste', '');

					$('section').each((i, el) => {
						$(el).find('.heading, .wrapper-pub').remove();
                    });

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

					$('.preparation-steps').each((i, el) => {
						Recipe.instructions.push(
							$(el).text().replace(/\s\s+/g, '\n').trim()
						);
					});

                    Recipe.time.prep = $('.recipe-timing.preparation')
                        .parent()
						.find('.recipe-timing-duration')
                        .text()
                        .replace(/\s\s+/g, ' ')
                        .trim();

                    Recipe.time.cook = $('.recipe-timing.cuisson')
                        .parent()
						.find('.recipe-timing-duration')
                        .text()
                        .replace(/\s\s+/g, ' ')
						.trim();

					Recipe.servings = $('.recette-portions')
						.find('.quantity')
						.text()
						.split(' à ')[0]
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

module.exports = zeste;
