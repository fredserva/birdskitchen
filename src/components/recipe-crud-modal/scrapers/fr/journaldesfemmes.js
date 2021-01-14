import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const journalDesFemmes = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('cuisine.journaldesfemmes.fr/')) {
			reject(
				new Error(
					"url provided must include 'cuisine.journaldesfemmes.fr'"
				)
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[name='og:image']").attr('content');

					Recipe.name = $("meta[name='og:title']")
						.attr('content')
						.replace('Recette de ', '');

					$('.app_recipe_list').each((i, el) => {
						$(el)
							.find('.app_recipe_ing_item')
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

					$('.app_recipe_section').each((i, el) => {
						$(el)
							.find('.grid_last')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild).text().trim()
								);
							});
					});

					Recipe.time.prep = $('.app_recipe_resume')
						.children('div')
						.first()
						.next()
						.find('span')
						.text()
						.replace('Préparation', '')
						.trim();

					Recipe.time.cook = $('.app_recipe_resume')
						.children('div')
						.first()
						.next()
						.next()
						.find('span')
						.text()
						.replace('Cuisson', '')
						.trim();

					Recipe.servings = $('#numberPerson').text();

					$('.bu_cuisine_themes').each((i, el) => {
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

export default journalDesFemmes;
