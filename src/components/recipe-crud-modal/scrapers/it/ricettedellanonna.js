import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const ricetteDellaNonna = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('ricettedellanonna.net/')) {
			reject(
				new Error("url provided must include 'ricettedellanonna.net/'")
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);

					Recipe.name = $('h1.main_title')
						.text()
						.replace(' | Ricette della Nonna', '');

					$('.ingredienti').each((i, el) => {
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

					// New recipes
					$('.recipeInstructions').each((i, el) => {
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

					// Old recipes
					$('.moduloadtop + div').each((i, el) => {
						let content = $(el).text();

						if (~content.indexOf('Procedimento')) {
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
						}
					});

					$('.preparazione').each((i, el) => {
						$(el).children('strong').remove();
						Recipe.time.prep = $(el).text();
					});

					$('.cottura').each((i, el) => {
						$(el).children('strong').remove();
						Recipe.time.cook = $(el).text();
					});

					$('.dosi_per').each((i, el) => {
						$(el).children('strong').remove();
						Recipe.servings = $(el).text().replace(/\D+/g, '');
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

export default ricetteDellaNonna;
