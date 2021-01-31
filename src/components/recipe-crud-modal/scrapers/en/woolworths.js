import request from 'request';

import RecipeSchema from '../../helpers/recipe-schema';

const instructionsIndexRe = /(?:\d.)(.*)/;
const instructionsTipRe = /(Tip:)(.*)/i;

const woolworths = (url) => {
	const Recipe = new RecipeSchema();
	return new Promise((resolve, reject) => {
		if (!url.includes('woolworths.com.au/shop/recipedetail/')) {
			reject(
				new Error(
					"url provided must include 'woolworths.com.au/shop/recipedetail/'"
				)
			);
		} else {
			const urlWithoutProtocol = url.split('/').slice(2).join('/');
			let grab = urlWithoutProtocol.replace('www.woolworths.com.au/shop/recipedetail/', '');
			const recipeId = grab.split('/')[0];
			let recipeJsonUrl = `https://www.woolworths.com.au/apis/ui/recipes/${recipeId}`;

			request(
				{
					url: recipeJsonUrl,
					json: true,
				},
				(error, response, html) => {
					if (!error && response.statusCode === 200 && html) {
						Recipe.image = html.ImageFilename;
						Recipe.name = html.Title.trim();
						Recipe.ingredients = html.Ingredients.map((i) =>
							i.Description.trim()
						);
						let prepDuration = '';
						if ( null === html.PreparationDuration ) {
							prepDuration = 0;
						} else {
							prepDuration = html.PreparationDuration;
						}
						Recipe.time.prep = prepDuration.toString();
						let cookDuration = '';
						if ( null === html.CookingDuration ) {
							cookDuration = 0;
						} else {
							cookDuration = html.CookingDuration;
						}
						Recipe.time.cook = cookDuration.toString();
						Recipe.servings = html.Servings.toString();
						html.Instructions.split('\r\n').forEach((step) => {
							let newIngredient = '';
							if (instructionsIndexRe.test(step)) {
								newIngredient = instructionsIndexRe
									.exec(step)[1]
									.trim();
							} else if (instructionsTipRe.test(step)) {
								newIngredient = step.trim();
							}
							if (newIngredient.length) {
								Recipe.instructions.push(newIngredient);
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
				}
			);
		}
	});
};

export default woolworths;
