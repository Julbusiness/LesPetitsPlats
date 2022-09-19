class Api {
	constructor(url) {
		this._url = url;
		// console.log(this._url);
	}

	async getRecipes() {
		try {
			const responseApi = await fetch(this._url);
			const responseJSON = await responseApi.json();
			const recipe = responseJSON.recipes;
			return recipe;
		} catch (err) {
			console.log("La requete api getRecipes a échoué : ", err);
			return null;
		}
	}

	async getIngredients() {
		try {
			const responseApi = await fetch(this._url);
			const responseJSON = await responseApi.json();
			const recipes = responseJSON.recipes;
			// console.log(recipes)
			const ingredientsList = [];

			recipes.forEach((recipe) => {
				recipe.ingredients.forEach((ingredient) => {
					const found = ingredientsList.find(
						(ingredientAlreadyCheck) =>
							ingredientAlreadyCheck === ingredient.ingredient
					);

					if (found === undefined) {
						ingredientsList.push(ingredient.ingredient);
					}
				});
			});
			ingredientsList.sort();
			return ingredientsList;
		} catch (err) {
			console.log("La requete api getIngredients a échoué : ", err);
			return null;
		}
	}
}
