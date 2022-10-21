const searchResultIngredients = document.querySelector(".tags");

// je crée ma fonction de filtres des ingredients
function filterIngredientsByInput(e) {
	console.log("je passe dans filterIngredientsByInput");

	const searchedIngredients = e.target.value.toLowerCase();

	if (searchedIngredients.length >= 0) {
		const ingredientsList = [];

		recipes.forEach((recipe) => {
			recipe.ingredients.forEach((ingredient) => {
				const foundIngredients = ingredientsList.find(
					(ingredientAlreadyCheck) =>
						ingredientAlreadyCheck === ingredient.ingredient
				);

				if (foundIngredients === undefined) {
					ingredientsList.push(ingredient.ingredient);
				}
			});
		});

		searchResultIngredients.innerHTML = "";

		const currentRecipesIngredients = ingredientsList.filter((el) =>
			el.toLowerCase().startsWith(searchedIngredients)
		);

		// console.log(currentRecipesArrredients);
		currentRecipesIngredients.sort();
		currentRecipesIngredients.forEach((ingredient) => {
			const currentIngredient = new Ingredients(ingredient);
			ulTagsIngredients.appendChild(currentIngredient.createIngredients());
		});

		recipes.filter(
			(el) =>
				el.name.toLowerCase().includes(searchedIngredients) ||
				el.description.toLowerCase().includes(searchedIngredients) ||
				el.ingredients.forEach((ingredient) => {
					ingredient.ingredient.toLowerCase().includes(searchedIngredients);
				})
		);
	} else {
		console.log("je suis dans le else de ingredientsSearch");
	}
}

function filterIngredientsByClick(e) {
	console.log("je passe dans filterIngredientsByClick");

	// correspond au tag sur lequel on clic
	const searchedIngredients = e.toLowerCase();

	// j'initialise mon tableau vide qui contiendra les recettes en cours
	let currentRecipesArr = [];

	// je place dans mon tableau vide les recettes en cours de selection
	recipes.filter((el) =>
		el.ingredients.forEach((ingredient) => {
			ingredient.ingredient.toLowerCase().includes(searchedIngredients);

			if (ingredient.ingredient.toLowerCase().includes(searchedIngredients)) {
				currentRecipesArr.push(el);
			}
		})
	);

	getRecipesFiltered(currentRecipesArr);
	createRecipeList(currentRecipesArr);
	getIngredients(currentRecipesArr);
	getAppareils(currentRecipesArr);
	getUstensiles(currentRecipesArr);
}
