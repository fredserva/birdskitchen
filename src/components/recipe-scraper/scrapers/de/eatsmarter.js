const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const eatSmarter = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('eatsmarter.de/')) {
			reject(new Error("url provided must include 'eatsmarter.de/'"));
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

					$('.ingredients-tab').each((i, el) => {
						$(el)
							.find('.ingredient')
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
					});

					$('.preparation-step-tab').each((i, el) => {
						$(el)
							.find('.preparation-step-content')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild).text().trim()
								);
							});
					});

					$('.tag-cloud-list').each((i, el) => {
						$(el)
							.find('li')
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

module.exports = eatSmarter;
