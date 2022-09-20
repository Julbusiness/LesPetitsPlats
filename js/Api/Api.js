class Api {
	constructor(url) {
		this._url = url;
		// console.log(this._url);
	}

	async getRecipes() {
		try {
			const responseApi = await fetch(this._url);
			const responseJSON = await responseApi.json();
			const recipes = responseJSON.recipes;
			return recipes;
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

	async getAppareils() {
		try {
			const responseApi = await fetch(this._url);
			const responseJSON = await responseApi.json();
			const recipes = responseJSON.recipes;
			const appareilsList = [];

			recipes.forEach((recipe) => {
				recipe.appliance.split().forEach((appliance) => {
					const found = appareilsList.find(
						(appareilsAlreadyCheck) => appareilsAlreadyCheck === appliance
					);

					if (found === undefined) {
						appareilsList.push(appliance);
					}
				});
			});
			appareilsList.sort();
			return appareilsList;
		} catch (err) {
			console.log("La requete api getAppareils a échoué : ", err);
			return null;
		}
	}

	async getUstensiles() {
		try {
			const responseApi = await fetch(this._url);
			const responseJSON = await responseApi.json();
			const recipes = responseJSON.recipes;
			const ustensilesList = [];

			recipes.forEach((recipe) => {
				recipe.ustensils.forEach((ustensile) => {
					const found = ustensilesList.find(
						(ustensileAlreadyCheck) =>
						ustensileAlreadyCheck === ustensile
					);

					if (found === undefined) {
						ustensilesList.push(ustensile);
					}
				});
			});

			ustensilesList.sort();
			return ustensilesList;
		} catch (err) {
			console.log("La requete api getUstensiles a échoué : ", err);
			return null;
		}
	}
}
