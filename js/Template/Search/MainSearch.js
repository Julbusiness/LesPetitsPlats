const searchResult = document.querySelector(".cards");

// je crée une variable pour mon array
let recipes;

// je déclenche un nouveau fetch des données
async function getRecipes() {
	// console.log('je suis dans getRecipes')
	const responseApi = await fetch("/data/recipes.json");
	const responseJSON = await responseApi.json();
	recipes = responseJSON.recipes;
}

// j'appel getRecipes
getRecipes();

async function getRecipesFiltered(filteredArr) {
	console.log("je suis dans getRecipesFiltered");
	recipes = filteredArr;
}

// je crée la structure de ma nouvelle carte
function createRecipeList(RecipeList) {
	console.log("je suis dans createRecipeList");

	searchResult.innerHTML = "";

	RecipeList.map((recipe) => new Recipe(recipe)).forEach((recipe) => {
		const Template = new Card(recipe);
		searchResult.appendChild(Template.createRecipeCard());
	});
	// console.log(RecipeList);
	// console.log(searchResult);
}

// je selectionne l'ul des tags et je vide le contenu
const ulTagsIngredients = document.querySelector(".tags");
const ulTagsAppareils = document.querySelector(".tags2");
const ulTagsUstensiles = document.querySelector(".tags3");

// j'applique le filtre sur les ingredients
async function getIngredients(filteredArr) {
	console.log("je suis dans getIngredients");
	const ingredientsList = [];

	filteredArr.forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			const found = ingredientsList.find(
				(ingredientAlreadyCheck) =>
					ingredientAlreadyCheck === ingredient.ingredient
			);

			if (found === undefined) {
				ulTagsIngredients.innerHTML = "";
				ingredientsList.push(ingredient.ingredient);
			} else {
				// console.log("supprimer le tag dans la liste"); // a voir l'action a faire ici
			}
		});
	});

	ingredientsList.sort();
	ingredientsList.forEach((ingredient) => {
		const currentIngredients = new Ingredients(ingredient);
		ulTagsIngredients.appendChild(currentIngredients.createIngredients());
	});
}

async function getAppareils(filteredArr) {
	console.log("je suis dans getAppareils");
	const appareilsList = [];

	filteredArr.forEach((recipe) => {
		recipe.appliance.split().forEach((appliance) => {
			const found = appareilsList.find(
				(appareilsAlreadyCheck) => appareilsAlreadyCheck === appliance
			);

			if (found === undefined) {
				ulTagsAppareils.innerHTML = "";
				appareilsList.push(appliance);
			}
		});
	});
	appareilsList.sort();
	appareilsList.forEach((appareil) => {
		const currentAppareils = new Appareils(appareil);
		ulTagsAppareils.appendChild(currentAppareils.createAppareils());
	});
}

async function getUstensiles(filteredArr) {
	console.log("je suis dans getUstensiles");
	const ustensilesList = [];

	filteredArr.forEach((recipe) => {
		recipe.ustensils.forEach((ustensile) => {
			const found = ustensilesList.find(
				(ustensileAlreadyCheck) => ustensileAlreadyCheck === ustensile
			);

			if (found === undefined) {
				ulTagsUstensiles.innerHTML = "";
				ustensilesList.push(ustensile);
			}
		});
	});

	ustensilesList.sort();
	ustensilesList.forEach((ustensile) => {
		const currentUstensiles = new Ustensiles(ustensile);
		ulTagsUstensiles.appendChild(currentUstensiles.createUstensiles());
	});
}

async function filterRecipes(e) {
	const searchedString = e.target.value.toLowerCase();
	console.log("je passe dans filterRecipes");
	/* -------------------------------------------------------------------------- */
	// si le nombre de caractère tapé est strictement superieur à 2 alors j'applique le filtre
	if (searchedString.length > 2) {
		// Je vide mon content qui contient les cards
		searchResult.innerHTML = "";

		// j'applique la recherche : au titre de la recette, à la description et aux ingrédients
		const filteredArr = recipes.filter(
			(el) =>
				el.name.toLowerCase().includes(searchedString) ||
				el.description.toLowerCase().includes(searchedString) ||
				el.ingredients.forEach((ingredient) => {
					ingredient.ingredient.toLowerCase().includes(searchedString);
				})
		);
		/* -------------------------------------------------------------------------- */
		// Dans ce cas si il y a des resultats, j'applique mon filtre et je crée les cartes qui correpondent
		// console.log(filteredArr.length);
		if (filteredArr.length !== 0) {
			// console.log("je passe de le if")
			getRecipesFiltered(filteredArr);
			createRecipeList(filteredArr);
			getIngredients(filteredArr);
			getAppareils(filteredArr);
			getUstensiles(filteredArr);
			// filterIngredients;
		} else {
			// console.log("aucune recette n'est trouvée")
			const error = document.createElement("p");
			error.classList.add("error");
			error.innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
			searchResult.appendChild(error);
		}

		/* -------------------------------------------------------------------------- */
		/* -------------------------------------------------------------------------- */

		let tags2 = document.querySelectorAll(".tags-item-appareils");
		tags2.forEach((li) =>
			li.addEventListener("click", toggleDropDownAppareils)
		);
		tags2.forEach((li) =>
			li.addEventListener("click", () => {
				const tag = li.innerHTML;
				const color = "success";
				const liItem = li;
				createTag(tag, color, liItem);
			})
		);
		/* -------------------------------------------------------------------------- */
		let tags3 = document.querySelectorAll(".tags-item-ustensiles");
		tags3.forEach((li) =>
			li.addEventListener("click", toggleDropDownUstensiles)
		);
		tags3.forEach((li) =>
			li.addEventListener("click", () => {
				let tag = li.innerHTML;
				const color = "danger";
				const liItem = li;
				createTag(tag, color, liItem);
			})
		);
		/* -------------------------------------------------------------------------- */
	} else {
		// sinon je réapplique les cartes de bases
		createRecipeList(recipes);
		getIngredients(recipes);
		getAppareils(recipes);
		getUstensiles(recipes);

		let tags = document.querySelectorAll(".tags-item-ingredients");

		// je met mon listener sur le click du bouton ingredients
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				toggleDropDownIngredients();
			})
		);

		tags.forEach((li) =>
			li.addEventListener("click", () => {
				const tag = li.innerHTML;
				const color = "primary";
				const liItem = li;
				createTag(tag, color, liItem);
			})
		);

		let tags2 = document.querySelectorAll(".tags-item-appareils");
		tags2.forEach((li) =>
			li.addEventListener("click", toggleDropDownAppareils)
		);
		tags2.forEach((li) =>
			li.addEventListener("click", () => {
				const tag = li.innerHTML;
				const color = "success";
				const liItem = li;
				createTag(tag, color, liItem);
			})
		);

		let tags3 = document.querySelectorAll(".tags-item-ustensiles");
		tags3.forEach((li) =>
			li.addEventListener("click", toggleDropDownUstensiles)
		);
		tags3.forEach((li) =>
			li.addEventListener("click", () => {
				let tag = li.innerHTML;
				const color = "danger";
				const liItem = li;
				createTag(tag, color, liItem);
			})
		);
	}
}
