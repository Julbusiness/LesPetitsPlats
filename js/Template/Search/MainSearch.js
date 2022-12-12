/* -------------------------------------------------------------------------- */
/* ------------------------------- main search ------------------------------ */
/* -------------------------------------------------------------------------- */

const searchResult = document.querySelector(".cards");

// je crée une variable pour mon array
let recipes;
let tags = [];
let currentRecipesArr = [];
let filteredArr = [];
let ingredientsList = [];
let appareilsList = [];
let ustensilesList = [];

// je déclenche un nouveau fetch des données
async function getRecipes() {
	const responseApi = await fetch("/data/recipes.json");
	const responseJSON = await responseApi.json();
	recipes = responseJSON.recipes;
}

// j'appel getRecipes
getRecipes();

// je crée la structure de ma nouvelle carte
function createRecipeList(RecipeList) {

	searchResult.innerHTML = "";

	RecipeList.map((recipe) => new Recipe(recipe)).forEach((recipe) => {
		const Template = new Card(recipe);
		searchResult.appendChild(Template.createRecipeCard());
	});
}

// je selectionne l'ul des tags
const ulTagsIngredients = document.querySelector(".tags");
const ulTagsAppareils = document.querySelector(".tags2");
const ulTagsUstensiles = document.querySelector(".tags3");

// j'applique le filtre sur les ingredients
async function getIngredients(currentRecipesArr, tags) {
	ingredientsList = [];

	currentRecipesArr.forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			ulTagsIngredients.innerHTML = "";
			ingredientsList.push(ingredient.ingredient);
		});
	});

	// enleve les doublons
	const arrayCleaned = [...new Set(ingredientsList)];

	// trie par ordre alphabetiques
	arrayCleaned.sort();

	// je crée mon arrayTags vide
	const arrayTags = [];

	// je met a l'interieur le nom de mes tags
	tags.forEach((tag) => {
		arrayTags.push(tag.name);
	});

	// je trie mon arrayTags par ordre alphabetique
	arrayTags.sort();

	// je filtre mes deux arrays pour trouver les elements qui ne sont pas communs
	let difference = arrayCleaned.filter((x) => !arrayTags.includes(x));
	ingredientsList = difference;

	// je crée chaque ingredient grace a mon model
	ingredientsList.forEach((ingredient) => {
		const currentIngredients = new Ingredients(ingredient);
		ulTagsIngredients.appendChild(currentIngredients.createIngredients());
	});
}

async function getAppareils(currentRecipesArr, tags) {
	appareilsList = [];

	currentRecipesArr.forEach((recipe) => {
		recipe.appliance.split().forEach((appliance) => {
			ulTagsAppareils.innerHTML = "";
			appareilsList.push(appliance);
		});
	});

	// enleve les doublons
	const arrayCleaned = [...new Set(appareilsList)];

	arrayCleaned.sort();

	// je crée mon arrayTags vide
	const arrayTags = [];

	// je met a l'interieur le nom de mes tags
	tags.forEach((tag) => {
		arrayTags.push(tag.name);
	});

	// je trie mon arrayTags par ordre alphabetique
	arrayTags.sort();

	// je filtre mes deux arrays pour trouver les elements qui ne sont pas communs
	let difference = arrayCleaned.filter((x) => !arrayTags.includes(x));
	appareilsList = difference;

	// je crée chaque ingredient grace a mon model
	appareilsList.forEach((appareil) => {
		const currentAppareils = new Appareils(appareil);
		ulTagsAppareils.appendChild(currentAppareils.createAppareils());
	});
}

async function getUstensiles(currentRecipesArr, tags) {
	
	ustensilesList = [];

	currentRecipesArr.forEach((recipe) => {
		recipe.ustensils.forEach((ustensile) => {
			ulTagsUstensiles.innerHTML = "";
			ustensilesList.push(ustensile);
		});
	});

	// enleve les doublons
	const arrayCleaned = [...new Set(ustensilesList)];

	// trie par ordre alphabetiques
	arrayCleaned.sort();

	// je crée mon arrayTags vide
	const arrayTags = [];

	// je met a l'interieur le nom de mes tags
	tags.forEach((tag) => {
		arrayTags.push(tag.name);
	});

	// je trie mon arrayTags par ordre alphabetique
	arrayTags.sort();

	// je filtre mes deux arrays pour trouver les elements qui ne sont pas communs
	let difference = arrayCleaned.filter((x) => !arrayTags.includes(x));
	ustensilesList = difference;

	// je crée chaque ingredient grace a mon model
	ustensilesList.forEach((ustensile) => {
		const currentUstensiles = new Ustensiles(ustensile);
		ulTagsUstensiles.appendChild(currentUstensiles.createUstensiles());
	});
}

async function filterRecipes(e) {
	const searchedString = e.target.value.toLowerCase();

	// si le nombre de caractère tapé est strictement superieur à 2 alors j'applique le filtre
	if (searchedString.length > 2) {
		// Je vide mon content qui contient les cards
		searchResult.innerHTML = "";

		// j'applique la recherche : au titre de la recette, à la description et aux ingrédients
		filteredArr = recipes.filter(
			(el) =>
				el.name.toLowerCase().includes(searchedString) ||
				el.description.toLowerCase().includes(searchedString) ||
				el.ingredients.forEach((ingredient) => {
					ingredient.ingredient.toLowerCase().includes(searchedString);
				})
		);
		/* -------------------------------------------------------------------------- */
		// Dans ce cas si il y a des resultats, j'applique mon filtre et je crée les cartes qui correpondent
		if (filteredArr.length !== 0) {
			getRecipes();
			createRecipeList(filteredArr);
			getIngredients(filteredArr);
			getAppareils(filteredArr);
			getUstensiles(filteredArr);
		} else {
			const error = document.createElement("p");
			error.classList.add("error");
			error.innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
			searchResult.appendChild(error);
		}
	} else {
		// sinon je réapplique les cartes de bases
		getRecipes();
		createRecipeList(recipes);
		getIngredients(recipes);
		getAppareils(recipes);
		getUstensiles(recipes);
	}
}

/* -------------------------------------------------------------------------- */
/* --------------------------- ingredients search --------------------------- */
/* -------------------------------------------------------------------------- */

const searchResultIngredients = document.querySelector(".tags");

// je crée ma fonction de filtres des ingredients par remplissage de l'input
function filterIngredientsByInput(e) {

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
			el.toLowerCase().includes(searchedIngredients)
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
	}
}

// je crée ma fonction de filtres des ingredients par click de tags
function filterIngredientsByClick(tag, color, liItem) {
	
	searchResult.innerHTML = "";

	tags.push({ name: tag, type: "ingredient" });
	filterCurrentTags(tags);
	createTag(tag, color, liItem);
}

/* -------------------------------------------------------------------------- */
/* --------------------------- appareils search --------------------------- */
/* -------------------------------------------------------------------------- */

const searchResultAppareils = document.querySelector(".tags2");

// je crée ma fonction de filtres des ingredients par remplissage de l'input
function filterAppareilsByInput(e) {

	const searchedAppareils = e.target.value;

	if (searchedAppareils.length >= 0) {
		const appareilsList = [];

		recipes.forEach((recipe) => {
			const foundAppareils = appareilsList.find(
				(appareilAlreadyCheck) => appareilAlreadyCheck === recipe.appliance
			);
			if (foundAppareils === undefined) {
				appareilsList.push(recipe.appliance);
			}
		});

		searchResultAppareils.innerHTML = "";

		const currentRecipesAppareils = appareilsList.filter((el) =>
			el.toLowerCase().includes(searchedAppareils)
		);

		// console.log(currentRecipesArrredients);
		currentRecipesAppareils.sort();
		currentRecipesAppareils.forEach((appareil) => {
			const currentAppareil = new Appareils(appareil);
			ulTagsAppareils.appendChild(currentAppareil.createAppareils());
		});

		recipes.filter(
			(el) =>
				el.name.toLowerCase().includes(searchedAppareils) ||
				el.description.toLowerCase().includes(searchedAppareils) ||
				el.appareils.forEach((appareil) => {
					appareil.toLowerCase().includes(searchedAppareils);
				})
		);
	}
}

// je crée ma fonction de filtres des ingredients par click de tags
function filterAppareilsByClick(tag, color, liItem) {

	searchResult.innerHTML = "";

	tags.push({ name: tag, type: "appareil" });
	filterCurrentTags(tags);
	createTag(tag, color, liItem);
}

/* -------------------------------------------------------------------------- */
/* --------------------------- Ustensiles search --------------------------- */
/* -------------------------------------------------------------------------- */

const searchResultUstensiles = document.querySelector(".tags3");

// je crée ma fonction de filtres des ingredients par remplissage de l'input
function filterUstensilesByInput(e) {

	const searchedUstensiles = e.target.value;

	if (searchedUstensiles.length >= 0) {
		const ustensilesList = [];

		recipes.forEach((recipe) => {
			recipe.ustensils.forEach((ustensile) => {
				const foundUstensiles = ustensilesList.find(
					(ustensilesAlreadyCheck) => ustensilesAlreadyCheck === ustensile
				);

				if (foundUstensiles === undefined) {
					ustensilesList.push(ustensile);
				}
			});
		});

		searchResultUstensiles.innerHTML = "";

		const currentRecipesUstensiles = ustensilesList.filter((el) =>
			el.toLowerCase().includes(searchedUstensiles)
		);

		// console.log(currentRecipesArrredients);
		currentRecipesUstensiles.sort();
		currentRecipesUstensiles.forEach((ustensile) => {
			const currentUstensile = new Ustensiles(ustensile);
			ulTagsUstensiles.appendChild(currentUstensile.createUstensiles());
		});

		recipes.filter(
			(el) =>
				el.name.toLowerCase().includes(searchedUstensiles) ||
				el.description.toLowerCase().includes(searchedUstensiles) ||
				el.ustensils.forEach((ustensile) => {
					ustensile.toLowerCase().includes(searchedUstensiles);
				})
		);
	}
}

// je crée ma fonction de filtres des ingredients par click de tags
function filterUstensilesByClick(tag, color, liItem) {
	searchResult.innerHTML = "";

	tags.push({ name: tag, type: "ustensile" });
	filterCurrentTags(tags);
	createTag(tag, color, liItem);
}

/* -------------------------------------------------------------------------- */
/* --------------------------- fonctions communes --------------------------- */
/* -------------------------------------------------------------------------- */
function filterCurrentTags(tags) {

	if (filteredArr.length !== 0) {
		currentRecipesArr = filteredArr.filter((recipe) => recipesValidate(recipe));

		getRecipes();
		createRecipeList(currentRecipesArr);
		getIngredients(currentRecipesArr, tags);
		getAppareils(currentRecipesArr, tags);
		getUstensiles(currentRecipesArr, tags);
	} else {
		currentRecipesArr = recipes.filter((recipe) => recipesValidate(recipe));

		getRecipes();
		createRecipeList(currentRecipesArr);
		getIngredients(currentRecipesArr, tags);
		getAppareils(currentRecipesArr, tags);
		getUstensiles(currentRecipesArr, tags);
	}
}

function recipesValidate(recipe) {

	const ingredients = recipe.ingredients;
	const appareils = recipe.appliance.split();
	const ustensiles = recipe.ustensils;
	let recipeIsValidate = true;

	for (const tag of tags.filter((tag) => tag.type === "ingredient")) {
		const ingredientsFind = ingredients.find(
			(ingredient) =>
				ingredient.ingredient.toLowerCase() === tag.name.toLowerCase()
		);
		if (!ingredientsFind) {
			recipeIsValidate = false;
		}
	}

	for (const tag of tags.filter((tag) => tag.type === "appareil")) {
		const appareilsFind = appareils.find(
			(appareil) => appareil.toLowerCase() === tag.name.toLowerCase()
		);
		if (!appareilsFind) {
			recipeIsValidate = false;
		}
	}

	for (const tag of tags.filter((tag) => tag.type === "ustensile")) {
		const ustensilesFind = ustensiles.find(
			(ustensile) => ustensile.toLowerCase() === tag.name.toLowerCase()
		);
		if (!ustensilesFind) {
			recipeIsValidate = false;
		}
	}

	return recipeIsValidate;
}

function deleteTag(e) {
	let notif = e.path[1];

	// je supprime le li (pour le moment le premier trouvé)
	notif.remove();

	// je veux filtrer les données une nouvelle fois pour ajouter les recettes
	const notifDel = e.target.previousSibling.data.toLowerCase().split();

	const result = tags.filter(
		(tag) => !tag.name.toLowerCase().includes(notifDel)
	);

	if (result) {
		tags = result;
		filterCurrentTags(tags);
		return result;
	}
}
