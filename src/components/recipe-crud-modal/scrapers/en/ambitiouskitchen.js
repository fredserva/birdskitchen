import request from 'request';
import { load } from 'cheerio';

import RecipeSchema from '../../helpers/recipe-schema';

const ambitiousKitchen = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('ambitiouskitchen.com/')) {
			reject(
				new Error("url provided must include 'ambitiouskitchen.com/'")
			);
		} else {
			request(url, (error, response, html) => {
				if (!error && response.statusCode === 200) {
					const $ = load(html);

					Recipe.image = $("meta[property='og:image']").attr(
						'content'
					);
					Recipe.name = $("meta[property='og:title']")
						.attr('content')
						.replace(' | Ambitious Kitchen', '');

					$('.wprm-recipe-ingredient').each((i, el) => {
						const item = $(el).text().replace(/\s\s+/g, ' ').trim();
						Recipe.ingredients.push(item);
					});

					$('.wprm-recipe-instruction-text').each((i, el) => {
						const step = $(el).text().replace(/\s\s+/g, '').trim();
						Recipe.instructions.push(step);
					});

					Recipe.servings = $('.wprm-recipe-servings').text();

					$('.wprm-recipe-prep-time-name').remove();
					Recipe.time.prep = $('.wprm-recipe-prep-time-container')
						.text()
						.trim();

					$('.wprm-recipe-cook-time-name').remove();
					Recipe.time.cook = $('.wprm-recipe-cook-time-container')
						.text()
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

export default ambitiousKitchen;
