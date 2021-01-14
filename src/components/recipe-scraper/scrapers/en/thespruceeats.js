const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const theSpruceEats = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('thespruceeats.com/')) {
			reject(new Error("url provided must include 'thespruceeats.com/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = cheerio.load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $('.heading__title').text();

					$('.simple-list__item').each((i, el) => {
						Recipe.ingredients.push($(el).text().trim());
					});

					$('.section--instructions')
						.find('li')
						.find('p.comp')
						.each((i, el) => {
							Recipe.instructions.push($(el).text().trim());
						});

					$('.recipe-search-suggestions__chip').each((i, el) => {
						Recipe.tags.push($(el).find('a').text());
					});

					$('.cook-time')
						.find('.meta-text__data')
						.each((i, el) => {
							Recipe.time.cook = $(el).text();
						});

					$('.prep-time')
						.find('.meta-text__data')
						.each((i, el) => {
							Recipe.time.prep = $(el).text();
						});

					$('.total-time')
						.find('.meta-text__data')
						.each((i, el) => {
							Recipe.time.total = $(el).text();
						});

					$('.recipe-serving')
						.find('.meta-text__data')
						.each((i, el) => {
							Recipe.servings = $(el)
								.text()
								.replace('servings', '')
								.split(' ')[0]
								.split('-')[0];
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

module.exports = theSpruceEats;
