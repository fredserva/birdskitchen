import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const coupDePouce = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('coupdepouce.com/')) {
			reject(new Error("url provided must include 'coupdepouce.com'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);

					let lowercaseTitle = $("meta[property='og:title']")
						.attr('content')
						.replace(' | Coup de Pouce', '')
						.replace('Recette de ', '');
					Recipe.name =
						lowercaseTitle.charAt(0).toUpperCase() +
						lowercaseTitle.slice(1);

					$('.ingredients').each((i, el) => {
						$(el).find('h4').remove();
						$(el).find('.nutritional-facts').remove();
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

					$('.method').each((i, el) => {
						$(el)
							.find('.MsoNoSpacing, p')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild).text().trim()
								);
							});
					});

					$('.recipe-infos').each((i, el) => {
						$(el)
							.find('li')
							.each((i, elChild) => {
								const title = $(elChild).find('.cat').text();
								switch (title) {
									case 'Préparation':
										Recipe.time.prep = $(elChild)
											.find('.value')
											.text();
										break;
									case 'Cuisson':
										Recipe.time.cook = $(elChild)
											.find('.value')
											.text();
										break;
									case 'Portion(s)':
										Recipe.servings = $(elChild)
											.find('.value')
											.text()
											.replace(/\D+/g, '')
											.split(' ')[0]
											.split('-')[0]
											.trim();
										break;
									default:
										break;
								}
							});
					});

					$('.tags').each((i, el) => {
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

export default coupDePouce;
