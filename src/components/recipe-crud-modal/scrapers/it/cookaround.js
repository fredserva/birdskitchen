import request from 'request';
import { load } from 'cheerio';
import { parseDomain, fromUrl } from 'parse-domain';

import RecipeSchema from '../../helpers/recipe-schema';

const cookAround = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('cookaround.com/')) {
			reject(new Error("url provided must include 'cookaround.com/'"));
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);

					let originalName = $("meta[property='og:title']").attr(
						'content'
					);
					let originalSiteName = $(
						"meta[property='og:site_name']"
					).attr('content');

					Recipe.name = originalName.replace(originalSiteName, '');

					$('.r-ingredients, .recipe-ingredients-content').each(
						(i, el) => {
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
						}
					);

					$('.mat-ric-steps').each((i, el) => {
						$(el)
							.find('.step')
							.each((i, elChild) => {
								Recipe.instructions.push(
									$(elChild)
										.text()
										.replace(/\s\s+/g, ' ')
										.trim()
								);
							});
					});

					$('.recipe-steps').each((i, el) => {
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

					$('.r-cat').each((i, el) => {
						$(el)
							.find('strong')
							.each((i, elChild) => {
								Recipe.tags.push($(elChild).text().trim());
							});
					});

					const { subDomains } = parseDomain(fromUrl(url));
					if ('blog' === subDomains[0]) {
						Recipe.servings = $('.servings')
							.find('.recipe-value')
							.text()
							.replace(/\D+/g, '');

						Recipe.time.prep = $('.preptime')
							.find('.recipe-value')
							.text();

						Recipe.time.cook = $('.cooktime')
							.find('.recipe-value')
							.text();
					} else {
						Recipe.servings = $('.yield')
							.find('strong')
							.text()
							.replace(/\D+/g, '');

						Recipe.time.prep = $('.preptime').find('strong').text();

						Recipe.time.cook = $('.cooktime').find('strong').text();
					}

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

export default cookAround;
