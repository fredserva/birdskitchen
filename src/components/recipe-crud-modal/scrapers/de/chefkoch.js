import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const chefKoch = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('chefkoch.de/rezepte')) {
			reject(
				new Error("url provided must include 'chefkoch.de/rezepte/'")
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $("meta[property='og:image:alt']").attr(
						'content'
					);

					$('.ingredients').each((i, el) => {
						$(el)
							.find('tr')
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
					});

					$('article').each((i, el) => {
						const title = $(el).children('h2').text();
						const value = $(el)
							.children('.ds-box')
							.first()
							.text()
							.replace(/\n\s*\n/g, '\n')
							.trim();
						// Let's remove the icon before defining the value
						$(el)
							.children('.ds-recipe-meta')
							.children('span')
							.first()
							.children('i')
							.remove();
						const valuePrep = $(el)
							.children('.ds-recipe-meta')
							.children('span')
							.first()
							.text()
							.replace('Arbeitszeit ca. ', '')
							.trim();
						// Let's remove the icon before defining the value
						$(el)
							.children('.ds-recipe-meta')
							.children('span')
							.first()
							.next()
							.children('i')
							.remove();
						const valueCook = $(el)
							.children('.ds-recipe-meta')
							.children('span')
							.first()
							.next()
							.text()
							.replace('Koch-/Backzeit ca. ', '')
							.trim();
						switch (title) {
							case 'Zubereitung':
								Recipe.instructions.push(value);
								Recipe.time.prep = valuePrep;
								Recipe.time.cook = valueCook;
								break;
							default:
								break;
						}
					});

					Recipe.servings = $('input[name="portionen"]').attr(
						'value'
					);

					$('.recipe-tags').each((i, el) => {
						$(el)
							.find('.bi-tags')
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

export default chefKoch;
