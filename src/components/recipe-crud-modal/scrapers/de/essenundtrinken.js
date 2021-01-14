import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const essenUndTrinken = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('essen-und-trinken.de/')) {
			reject(
				new Error("url provided must include 'essen-und-trinken.de/'")
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					let ogImage = $("meta[property='og:image']").attr('content');

					if (
						ogImage.indexOf('jpg') !== -1 ||
						ogImage.indexOf('jpeg') !== -1 ||
						ogImage.indexOf('png') !== -1
					) {
						Recipe.image = '';
					} else {
						Recipe.image = ogImage;
					}

					Recipe.name = $("meta[property='og:title']").attr(
						'content'
					);

					$('.recipe-ingredients__label').each((i, el) => {
						const value = $(el).prev().attr('value');
						// Remove unit plural
						$(el).find('.recipe-ingredients__unit-plural').remove();
						// Get text
						const label = $(el)
							.text()
							.replace(/\s\s+/g, ' ')
							.replace(
								/(?<=\d)(?=[^\d\s])|(?<=[^\d\s])(?=\d)/g,
								' '
							)
							.replace(' , ', ',')
							.replace(' . ', '.')
							.replace(' / ', '/')
							.trim();
						Recipe.ingredients.push(value + ' ' + label);
					});

					$('.group--preparation-steps').each((i, el) => {
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

					Recipe.servings = $('.recipe-ingredients__value')
						.text()
						.trim();

					$('.recipe-meta__item--categories').each((i, el) => {
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

export default essenUndTrinken;
