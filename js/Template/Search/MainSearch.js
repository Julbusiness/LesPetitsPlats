console.log('je suis dans mainSearch')


const searchResult = document.querySelector(".cards");

// je crée une variable pour mon array
let recipes;
let tags = [];
let currentRecipesArr = [];
let RecipesArr = []


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
	console.log(RecipeList);

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
				(ingredientCheck) =>
					ingredientCheck === ingredient.ingredient
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
for (let tag of tags) {

	if (tag.name !== undefined) {
		console.log(tag.name);
		console.log(arrayCleaned);
		let common = arrayCleaned.filter(function (e) {
			console.log(e.toLowerCase())
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

function filterRecipes(e){
	console.log('je suis dans filterRecipes')
	const searchedString = e.target.value
	// console.log(searchedString)

	if (searchedString.length > 2) {
		currentRecipesArr = []
		// console.log(searchResult)
		console.log('je passe dans mon length > 2')

		for (let i = 0; i < recipes.length; i++) {
			if (recipes[i].name.toLowerCase().includes(searchedString) 
			|| recipes[i].description.toLowerCase().includes(searchedString) 
			|| recipes[i].ingredients.forEach((ingredient) => {
				ingredient.ingredient.toLowerCase().includes(searchedString)
			})){
				console.log("J'ai trouvé une correspondance")
				currentRecipesArr.push(recipes[i])
			}
		}

		if (currentRecipesArr.length !== 0) {
			console.log('je passe dans mon length !== 0')

			getRecipes()
			createRecipeList(currentRecipesArr)
			getIngredients(currentRecipesArr);
			getAppareils(currentRecipesArr);
			getUstensiles(currentRecipesArr);
		} else {
			searchResult.innerHTML = ""
			const error = document.createElement("p");
			error.classList.add("error");
			error.innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
			searchResult.appendChild(error);
		}

		let tags2 = document.querySelectorAll(".tags-item-appareils");

		for (let j = 0; j < tags2.length; j++) {
			tags2[j].addEventListener("click", () => {
				const tag = tags2[j].innerHTML;
				const color = "success";
				const liItem = tags2[j];
				createTag(tag, color, liItem);
			})
			
		}

		for (let k = 0; k < tags2.length; k++) {
			tags2[k].addEventListener("click", toggleDropDownAppareils())
		}

		/* -------------------------------------------------------------------------- */
		let tags3 = document.querySelectorAll(".tags-item-ustensiles");

		for (let l = 0; l < tags3.length; l++) {
			tags3[l].addEventListener("click", () => {
				const tag = tags3[l].innerHTML;
				const color = "success";
				const liItem = tags3[l];
				createTag(tag, color, liItem);
			})
			
		}

		for (let m = 0; m < tags3.length; m++) {
			tags3[m].addEventListener("click", toggleDropDownAppareils())
		}
		/* -------------------------------------------------------------------------- */
	} else {
		// sinon je réapplique les cartes de bases
		createRecipeList(recipes);
		getIngredients(recipes);
		getAppareils(recipes);
		getUstensiles(recipes);

		let tags = document.querySelectorAll(".tags-item-ingredients");

		// je met mon listener sur le click du bouton ingredients
		for (let n = 0; n < tags.length; n++) {
			tags[n].addEventListener("click", () => {
				toggleDropDownIngredients();
			})
		}

		for (let o = 0; o < tags.length; o++) {
			tags[o].addEventListener("click", () => {
				const tag = tags[o].innerHTML;
				const color = "primary";
				const liItem = tags[o];
				createTag(tag, color, liItem);
			})
		}

		let tags2 = document.querySelectorAll(".tags-item-appareils");

		for (let p = 0; p < tags2.length; p++) {
			tags2[p].addEventListener("click", () => {
				const tag = tags2[p].innerHTML;
				const color = "success";
				const liItem = tags2[p];
				createTag(tag, color, liItem);
			})
			
		}

		for (let q = 0; q < tags2.length; q++) {
			tags2[q].addEventListener("click", toggleDropDownAppareils())
		}

		/* -------------------------------------------------------------------------- */
		let tags3 = document.querySelectorAll(".tags-item-ustensiles");

		for (let r = 0; r < tags3.length; r++) {
			tags3[r].addEventListener("click", () => {
				const tag = tags3[r].innerHTML;
				const color = "success";
				const liItem = tags3[r];
				createTag(tag, color, liItem);
			})
			
		}

		for (let s = 0; s < tags3.length; s++) {
			tags3[s].addEventListener("click", toggleDropDownAppareils())
		}
	
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

	RecipesArr = recipes.filter((recipe) => recipesValidate(recipe));

	getRecipes();
	createRecipeList(RecipesArr);
	getIngredients(RecipesArr, tags);
	getAppareils(RecipesArr, tags);
	getUstensiles(RecipesArr, tags);
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