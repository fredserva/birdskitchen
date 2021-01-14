import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const madameFigaro = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('madame.lefigaro.fr/recettes')) {
			reject(
				new Error(
					"url provided must include 'madame.lefigaro.fr/recettes/'"
				)
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);

					let lowercaseTitle = $("meta[property='og:title']")
						.attr('content')
						.replace('Recette ', '');
					Recipe.name = lowercaseTitle.charAt(0).toUpperCase() + lowercaseTitle.slice(1);

					$(
						'.mad__recette__ingredients__info__ingredient__list'
					).each((i, el) => {
						$(el)
							.find('li')
							.each((i, elChild) => {
								Recipe.ingredients.push(
									$(elChild)
										.text()
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

					$('.mad__recette-content').each((i, el) => {
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

					$('.recette-infos-timing').each((i, el) => {
						Recipe.time.prep = $(el)
							.find('.first')
							.text()
							.replace('Temps de préparation : ', '')
							.trim();
					});

					$('.recette-infos-timing').each((i, el) => {
						Recipe.time.cook = $(el)
							.find('.last:not(.first.last)')
							.text()
							.replace('Temps de cuisson : ', '')
							.trim();
					});

					$('.mad__sous-titre').remove('h2');
					Recipe.servings = $('.mad__sous-titre')
						.text()
						.replace(/\D+/g, '')
						.split(' ')[0]
						.split('-')[0]
						.trim();

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

export default madameFigaro;
