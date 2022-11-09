/* -------------------------------------------------------------------------- */
/* ------------------------------- main search ------------------------------ */
/* -------------------------------------------------------------------------- */

const searchResult = document.querySelector(".cards");

// je crée une variable pour mon array
let recipes;
let tags = [];

// je déclenche un nouveau fetch des données
async function getRecipes() {
	console.log("je suis dans getRecipes");
	const responseApi = await fetch("/data/recipes.json");
	const responseJSON = await responseApi.json();
	recipes = responseJSON.recipes;
}

// j'appel getRecipes
getRecipes();

// je crée la structure de ma nouvelle carte
function createRecipeList(RecipeList) {
	console.log("je suis dans createRecipeList");
	// console.log(RecipeList);

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
async function getIngredients(currentRecipesArr, tags) {
	console.log("je suis dans getIngredients");
	// console.log(currentRecipesArr)
	let ingredientsList = [];

	currentRecipesArr.forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			const found = ingredientsList.find(
				(ingredientAlreadyCheck) =>
					ingredientAlreadyCheck === ingredient.ingredient
			);

			if (found === undefined) {
				ulTagsIngredients.innerHTML = "";
				ingredientsList.push(ingredient.ingredient.toLowerCase());
				console.log(ingredientsList);
			}
		});
	});

	// enleve les doublons
	const arrayCleaned = [...new Set(ingredientsList)];

	// trie par ordre alphabetiques
	arrayCleaned.sort();

	// boucles pour créer chaque ingredient
	arrayCleaned.forEach((ingredient) => {
		const currentIngredients = new Ingredients(ingredient);
		ulTagsIngredients.appendChild(currentIngredients.createIngredients());
	});

	// filtre les elements du tableau arrayCleaned pour vérifier si il corresponde a un element du tableau tags, dans le but de le faire disparaitre de la liste si il existe

	let common = arrayCleaned.filter((x) => !x.includes(tags));
	console.log(arrayCleaned);
	console.log(tags);
	console.log(common);

	if (common) {
		ulTagsIngredients.innerHTML = "";
		ingredientsList = common;
		console.log(ingredientsList);

		ingredientsList.forEach((ingredient) => {
			const currentIngredients = new Ingredients(ingredient);
			console.log(currentIngredients);
			ulTagsIngredients.appendChild(currentIngredients.createIngredients());
		});
	}
}

async function getAppareils(currentRecipesArr) {
	console.log("je suis dans getAppareils");
	const appareilsList = [];

	currentRecipesArr.forEach((recipe) => {
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

async function getUstensiles(currentRecipesArr) {
	console.log("je suis dans getUstensiles");
	const ustensilesList = [];

	currentRecipesArr.forEach((recipe) => {
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
			// getRecipesFiltered(filteredArr);
			getRecipes();
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

/* -------------------------------------------------------------------------- */
/* --------------------------- ingredients search --------------------------- */
/* -------------------------------------------------------------------------- */

const searchResultIngredients = document.querySelector(".tags");

// je crée ma fonction de filtres des ingredients par remplissage de l'input
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

// je crée ma fonction de filtres des ingredients par click de tags

const allIngredients = [];
const ingredientsPerRecipe = [];

function filterIngredientsByClick(tag, color, liItem) {
	console.log("je passe dans filterIngredientsByClick");
	// console.log(e);
	searchResult.innerHTML = "";

	tags.push(tag.toLowerCase());
	filterCurrentTags(tags);
	createTag(tag, color, liItem);
}

function filterCurrentTags(tags) {
	console.log("je passe dans filterCurrentTags");

	let currentRecipesArr = [];

	// utiliser filter et find pour adapter le bout de code 328 a 333
	currentRecipesArr = recipes.filter((recipe) => hasTagForIngredients(recipe));

	getRecipes();
	createRecipeList(currentRecipesArr);
	getIngredients(currentRecipesArr, tags);
	getAppareils(currentRecipesArr);
	getUstensiles(currentRecipesArr);
}

function hasTagForIngredients(recipe) {
	// console.log("Je passe dans ma fonction hasTagForIngredients");

	const filteredIngredientsList = [];

	recipe.ingredients.forEach((ingredientList) => {
		filteredIngredientsList.push(ingredientList.ingredient.toLowerCase());
		// console.log(filteredIngredients)
	});

	const result = filteredIngredientsList.filter((x) => tags.includes(x));
	// console.log("Les elements communs sont " + result);
	// console.log(tags)

	if (result.length === tags.length) {
		// console.log(recipe);
		return true;
	} else {
		return false;
	}
}

/* ----------------------------- test deleteTag ----------------------------- */

function deleteTag(e) {
	let notif = e.path[1];
	// console.log(e.path[1])

	// je supprime le li (pour le moment le premier trouvé)
	notif.remove();

	// je veux filtrer les données une nouvelle fois pour ajouter les recettes
	const notifDel = e.target.previousSibling.data.toLowerCase().split();

	const result = tags.filter((ingredient) => !ingredient.includes(notifDel));

	if (result) {
		tags = result;
		console.log(tags);
		filterCurrentTags();
		return result;
	}
}
