const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const marmiton = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('marmiton.org/')) {
			reject(new Error("url provided must include 'marmiton.org/'"));
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

					$('.recipe-ingredients__list').each((i, el) => {
						$(el)
							.find('.recipe-ingredients__list__item')
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

					$('.recipe-preparation__list').each((i, el) => {
						$(el)
							.find('.recipe-preparation__list__item')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild).text().trim()
								);
							});
					});

					Recipe.time.prep = $('.recipe-infos__timmings__preparation')
						.text()
						.replace('Préparation', '')
						.replace(':', '')
						.trim();
					Recipe.time.cook = $('.recipe-infos__timmings__value')
						.text()
						.trim();

					Recipe.servings = $(
						'.recipe-infos__quantity__value'
					).text();

					$('.mrtn-tags-list').each((i, el) => {
						$(el)
							.find('.mrtn-tag')
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

module.exports = marmiton;
