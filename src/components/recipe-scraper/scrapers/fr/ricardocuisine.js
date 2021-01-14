const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const ricardoCuisine = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('ricardocuisine.com/')) {
			reject(new Error("url provided must include 'ricardocuisine.com'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = cheerio.load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $("meta[property='og:title']")
						.attr('content')
						.replace(' | Ricardo', '');

					$('.form-ingredients').each((i, el) => {
						$(el).find('.batchAction').remove();
					});
					$('.form-ingredients').each((i, el) => {
						$(el)
							.find('h3, li')
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.text()
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

					$('.preparation').each((i, el) => {
						$(el).find('h2').remove();
					});
					Recipe.instructions.push(
						$('.preparation').text().replace(/\s\s+/g, '\n').trim()
					);

					$('dl').each((i, el) => {
						$(el)
							.find('dt')
							.each((i, elChild) => {
								const title = $(elChild).text();
								switch (title) {
									case 'Préparation':
										Recipe.time.prep = $(elChild)
											.next()
											.text()
											.trim();
										break;
									case 'Cuisson':
										Recipe.time.cook = $(elChild)
											.next()
											.text()
											.trim();
										break;
										case 'Portions':
											Recipe.servings = $(elChild)
											.next()
											.text()
											.replace(/\D+/g, '')
											.split(' ')[0]
											.split('-')[0]
											.trim();
											break;
									default:
										break;
								}
							});
					});

					$('.tags').find('h2').remove();
					$('.tags').each((i, el) => {
						$(el)
							.find('.keyword')
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

module.exports = ricardoCuisine;
