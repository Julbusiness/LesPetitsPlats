/* -------------------------------------------------------------------------- */
/* ------------------------------- main search ------------------------------ */
/* -------------------------------------------------------------------------- */

const searchResult = document.querySelector(".cards");

// je crée une variable pour mon array
let recipes;
let tags = [];
let currentRecipesArr = [];
let filteredArr = [];

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
				(ingredientCheck) => ingredientCheck === ingredient.ingredient
			);

			if (found === undefined) {
				ulTagsIngredients.innerHTML = "";
				ingredientsList.push(ingredient.ingredient);
				// console.log(ingredientsList);
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

	// console.log(arrayCleaned);
	// console.log(tags);
	for (let tag in tags) {
		if (tag.name !== undefined) {
			console.log(tag.name);
			console.log(arrayCleaned);
			let common = arrayCleaned.filter(function (e) {
				console.log(e.toLowerCase());
				return !tag.name.includes(e.toLowerCase());
			});
			console.log(common);
			if (common) {
				ulTagsIngredients.innerHTML = "";
				ingredientsList = common;
				// console.log(ingredientsList);

				ingredientsList.forEach((ingredient) => {
					const currentIngredients = new Ingredients(ingredient);
					// console.log(currentIngredients);
					ulTagsIngredients.appendChild(currentIngredients.createIngredients());
				});
			} else {
				let secondFilter = arrayCleaned.filter(function (e) {
					return tags.indexOf(e) == -1;
				});

				secondFilter.forEach((ingredient) => {
					const currentIngredients = new Ingredients(ingredient);
					// console.log(currentIngredients);
					ulTagsIngredients.appendChild(currentIngredients.createIngredients());
				});
			}
		}
	}
}

async function getAppareils(currentRecipesArr, tags) {
	console.log("je suis dans getAppareils");
	let appareilsList = [];

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

	// enleve les doublons
	const arrayCleaned = [...new Set(appareilsList)];

	arrayCleaned.sort();
	arrayCleaned.forEach((appareil) => {
		const currentAppareils = new Appareils(appareil);
		ulTagsAppareils.appendChild(currentAppareils.createAppareils());
	});

	// console.log(arrayCleaned);
	// console.log(tags);

	if (tags !== undefined && tags.length !== 0) {
		// console.log(tags);
		// console.log(arrayCleaned);
		let common = arrayCleaned.filter(function (e) {
			// console.log(tags.indexOf(e))
			return tags[0].name.indexOf(e.toLowerCase()) === -1;
		});

		if (common) {
			ulTagsAppareils.innerHTML = "";
			appareilsList = common;
			// console.log(appareilsList);

			appareilsList.forEach((appareil) => {
				const currentAppareils = new Appareils(appareil);
				// console.log(currentAppareils);
				ulTagsAppareils.appendChild(currentAppareils.createAppareils());
			});
		} else {
			let secondFilter = arrayCleaned.filter(function (e) {
				return tags.indexOf(e) == -1;
			});

			secondFilter.forEach((appareil) => {
				const currentAppareils = new Appareils(appareil);
				// console.log(currentAppareils);
				ulTagsAppareils.appendChild(currentAppareils.createAppareils());
			});
		}
	}
}

async function getUstensiles(currentRecipesArr, tags) {
	console.log("je suis dans getUstensiles");
	let ustensilesList = [];

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

	const arrayCleaned = [...new Set(ustensilesList)];

	ustensilesList.sort();
	ustensilesList.forEach((ustensile) => {
		const currentUstensiles = new Ustensiles(ustensile);
		ulTagsUstensiles.appendChild(currentUstensiles.createUstensiles());
	});

	if (tags !== undefined && tags.length !== 0) {
		// console.log(tags);
		// console.log(arrayCleaned);
		let common = arrayCleaned.filter(function (e) {
			return tags[0].name.indexOf(e.toLowerCase()) === -1;
		});
		// console.log(common);
		if (common) {
			ulTagsUstensiles.innerHTML = "";
			ustensilesList = common;
			// console.log(ingredientsList);

			ustensilesList.forEach((ustensile) => {
				const currentUstensiles = new Ustensiles(ustensile);
				// console.log(currentIngredients);
				ulTagsUstensiles.appendChild(currentUstensiles.createUstensiles());
			});
		} else {
			let secondFilter = arrayCleaned.filter(function (e) {
				return tags.indexOf(e) == -1;
			});

			secondFilter.forEach((ustensile) => {
				const currentUstensiles = new Ustensiles(ustensile);
				// console.log(currentIngredients);
				ulTagsUstensiles.appendChild(currentUstensiles.createUstensiles());
			});
		}
	}
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
	} else {
		console.log("je suis dans le else de ingredientsSearch");
	}
}

// je crée ma fonction de filtres des ingredients par click de tags
function filterIngredientsByClick(tag, color, liItem) {
	console.log("je passe dans filterIngredientsByClick");
	// console.log(e);
	searchResult.innerHTML = "";

	tags.push({ name: tag.toLowerCase(), type: "ingredient" });
	filterCurrentTags(tags);
	createTag(tag, color, liItem);
}

/* -------------------------------------------------------------------------- */
/* --------------------------- appareils search --------------------------- */
/* -------------------------------------------------------------------------- */

const searchResultAppareils = document.querySelector(".tags2");

// je crée ma fonction de filtres des ingredients par remplissage de l'input
function filterAppareilsByInput(e) {
	console.log("je passe dans filterAppareilsByInput");

	console.log(e.target.value);

	const searchedAppareils = e.target.value;

	if (searchedAppareils.length >= 0) {
		const appareilsList = [];

		recipes.forEach((recipe) => {
			console.log(recipe.appliance);
			const foundAppareils = appareilsList.find(
				(appareilAlreadyCheck) => appareilAlreadyCheck === recipe.appliance
			);
			console.log(foundAppareils);

			if (foundAppareils === undefined) {
				appareilsList.push(recipe.appliance);
			}

			console.log(appareilsList);
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
	} else {
		console.log("je suis dans le else de appareilsSearch");
	}
}

// je crée ma fonction de filtres des ingredients par click de tags
function filterAppareilsByClick(tag, color, liItem) {
	console.log("je passe dans filterAppareilsByClick");
	// console.log(e);
	searchResult.innerHTML = "";

	tags.push({ name: tag.toLowerCase(), type: "appareil" });
	filterCurrentTags(tags);
	createTag(tag, color, liItem);
}

/* -------------------------------------------------------------------------- */
/* --------------------------- Ustensiles search --------------------------- */
/* -------------------------------------------------------------------------- */

const searchResultUstensiles = document.querySelector(".tags3");

// je crée ma fonction de filtres des ingredients par remplissage de l'input
function filterUstensilesByInput(e) {
	console.log("je passe dans filterUstensilesByInput");

	const searchedUstensiles = e.target.value;

	if (searchedUstensiles.length >= 0) {
		const ustensilesList = [];

		recipes.forEach((recipe) => {
			recipe.ustensils.forEach((ustensile) => {
				console.log(ustensile);
				const foundUstensiles = ustensilesList.find(
					(ustensilesAlreadyCheck) => ustensilesAlreadyCheck === ustensile
				);
				console.log(foundUstensiles);

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
	} else {
		console.log("je suis dans le else de ustensilesSearch");
	}
}

// je crée ma fonction de filtres des ingredients par click de tags
function filterUstensilesByClick(tag, color, liItem) {
	console.log("je passe dans filterUstensilesByClick");
	searchResult.innerHTML = "";

	tags.push({ name: tag.toLowerCase(), type: "ustensile" });
	filterCurrentTags(tags);
	createTag(tag, color, liItem);
}

/* -------------------------------------------------------------------------- */
/* --------------------------- fonctions communes --------------------------- */
/* -------------------------------------------------------------------------- */
function filterCurrentTags(tags) {
	console.log("je passe dans filterCurrentTags");

	if (filteredArr.length !== 0) {
		console.log("l'input est filtré");
		currentRecipesArr = filteredArr.filter((recipe) => recipesValidate(recipe));

		getRecipes();
		createRecipeList(currentRecipesArr);
		getIngredients(currentRecipesArr, tags);
		getAppareils(currentRecipesArr, tags);
		getUstensiles(currentRecipesArr, tags);
	} else {
		console.log("l'input n'est pas filtré'");
		currentRecipesArr = recipes.filter((recipe) => recipesValidate(recipe));

		getRecipes();
		createRecipeList(currentRecipesArr);
		getIngredients(currentRecipesArr, tags);
		getAppareils(currentRecipesArr, tags);
		getUstensiles(currentRecipesArr, tags);
	}
}

function recipesValidate(recipe) {
	console.log("Je passe dans ma fonction recipesValidate");

	const ingredients = recipe.ingredients;
	const appareils = recipe.appliance.split();
	const ustensiles = recipe.ustensils;
	let recipeIsValidate = true;

	for (const tag of tags.filter((tag) => tag.type === "ingredient")) {
		const ingredientsFind = ingredients.find(
			(ingredient) => ingredient.ingredient.toLowerCase() === tag.name
		);
		if (!ingredientsFind) {
			recipeIsValidate = false;
		}
	}

	for (const tag of tags.filter((tag) => tag.type === "appareil")) {
		const appareilsFind = appareils.find(
			(appareil) => appareil.toLowerCase() === tag.name
		);
		if (!appareilsFind) {
			recipeIsValidate = false;
		}
	}

	for (const tag of tags.filter((tag) => tag.type === "ustensile")) {
		const ustensilesFind = ustensiles.find(
			(ustensile) => ustensile.toLowerCase() === tag.name
		);
		if (!ustensilesFind) {
			recipeIsValidate = false;
		}
	}

	return recipeIsValidate;
}

function deleteTag(e) {
	let notif = e.path[1];
	console.log(e.path[1]);

	// je supprime le li (pour le moment le premier trouvé)
	notif.remove();

	// je veux filtrer les données une nouvelle fois pour ajouter les recettes
	const notifDel = e.target.previousSibling.data.toLowerCase().split();

	const result = tags.filter((tag) => !tag.name.includes(notifDel));

	if (result) {
		tags = result;
		filterCurrentTags(tags);
		return result;
	}
}
