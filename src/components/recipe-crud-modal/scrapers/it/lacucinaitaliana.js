import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const laCucinaItaliana = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('lacucinaitaliana.it/')) {
			reject(new Error("url provided must include 'lacucinaitaliana.it/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $("meta[property='og:title']").attr(
						'content'
					).replace(' - La Cucina Italiana', '');

					$('.entry').each((i, el) => {
						$(el)
							.find('.recipe-ingredients')
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.prev()
										.text()
										.replace(/\s\s+/g, '')
										.trim()
								);
								$(elChild)
								.find('li')
								.each((i, elGrandChild) => {
									Recipe.ingredients.push(
										$(elGrandChild)
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
					});

					$('.entry').each((i, el) => {
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

					$('.recipe-info').each((i, el) => {
						$(el)
							.find('.col-sm-6')
							.each((i, elChild) => {
								$(elChild)
								.find('em')
								.each((i, elGrandChild) => {
									Recipe.servings = $(elGrandChild).text().replace(/\D+/g, '').trim();
								});
							});
					});

					$('.tag-list').each((i, el) => {
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

export default laCucinaItaliana;
