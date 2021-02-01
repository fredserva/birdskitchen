import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const cucchiaio = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('cucchiaio.it/')) {
			reject(new Error("url provided must include 'cucchiaio.it/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);

					Recipe.name = $("meta[property='og:title']")
						.attr('content')
						.replace('Ricetta ', '');

					$('.ingredients-list').each((i, el) => {
						$(el)
							.find('li')
							.each((i, elChild) => {
								$(el).find('#savelist').remove();
								$(el).find('#gotolist').remove();
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

					$('.procedure-par').each((i, el) => {
						$(el)
							.find('p')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
					});
					Recipe.instructions.push($('.cda-text').text().trim());

					$('.tag').each((i, el) => {
						$(el)
							.find('a')
							.each((i, elChild) => {
								$(elChild).find('.badge').remove();
								Recipe.tags.push($(elChild).text().trim());
							});
					});

					$('.scheda-ricetta-new')
						.find('tr')
						.each((i, el) => {
							let title = $(el)
								.children('td:first-child')
								.text()
								.toLowerCase();
							let data = $(el)
								.children('td:last-child')
								.text()
								.toLowerCase();
							console.log(data);

							if (~title.indexOf('preparazione')) {
								Recipe.time.prep = data;
							} else if (~title.indexOf('cottura')) {
								Recipe.time.cook = data;
							} else if (~title.indexOf('porzioni')) {
								Recipe.servings = data.replace(/\D+/g, '');
							}
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

export default cucchiaio;
