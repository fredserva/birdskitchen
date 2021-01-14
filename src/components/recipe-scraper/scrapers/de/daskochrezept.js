const request = require('request');
const cheerio = require('cheerio');

const RecipeSchema = require('../../helpers/recipe-schema');

const dasKochrezept = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('daskochrezept.de/')) {
			reject(new Error("url provided must include 'daskochrezept.de/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = cheerio.load(html);

					Recipe.image = $("meta[property='og:image']")
						.attr('content')
						.replace(/[.]jpg.*/, '.jpg')
						.replace(/[.]jpeg.*/, '.jpg')
						.replace(/[.]png.*/, '.png');

					Recipe.name = $("meta[property='og:title']").attr(
						'content'
					);

					$('.ingredients-list').each((i, el) => {
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

					$('.recipe__preparation-steps').each((i, el) => {
						$(el)
							.find('.formatted-text')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
					});

					$('.recipe-trivia').each((i, el) => {
						$(el)
							.find('li')
							.each((i, elChild) => {
								$(elChild)
									.find('i')
									.each((i, elGrandChild) => {
										const title = $(elGrandChild).attr(
											'class'
										);
										if (
											title.includes('icon--preparation')
										) {
											Recipe.time.prep = $(elGrandChild)
												.next()
												.next()
												.text()
												.trim();
										}
										if (
											title.includes(
												'icon--cooking-time'
											) ||
											title.includes('icon--baking-time')
										) {
											Recipe.time.cook = $(elGrandChild)
												.next()
												.next()
												.text()
												.trim();
										}
									});
							});
					});

					Recipe.servings = $('.portion-calculator__portions')
						.text()
						.trim();

					$('.category-tag-cloud').each((i, el) => {
						$(el)
							.find('a')
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

module.exports = dasKochrezept;
