const searchResult = document.querySelector(".cards");

// je crée une variable pour mon array
let recipes;

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
	RecipeList.forEach((recipe) => {
		const listItem = document.createElement("div");
		listItem.classList.add("list-item-ingredients");

		listItem.innerHTML = `
    
    <img src="../../Assets/img.png" class="card-img-top" alt="">
    <div class="detail">
    <div class="time">
    <h3 class="card-text">${recipe.name}</h3>
    <div class="delay">
      <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
      class="bi bi-clock" viewBox="0 0 16 16">
      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
      </svg></span>
      <p class="timing">${recipe.time} min</p>
    </div>
    </div>
    <div class="card-body">
        <ul class="list-group"></ul>
        <p class="explain text-wrap text-truncate">${recipe.description}</p>
    </div>
    </div>
    
    `;
		searchResult.appendChild(listItem);
		const ul = listItem.querySelector(".list-group");
		const ingredients = recipe.ingredients;
		// console.log(ul);

		for (const ingredient of ingredients) {
			let newLi = document.createElement("li");
			newLi.classList.add("list-group-item");

			if (
				ingredient.hasOwnProperty("quantity") &&
				ingredient.hasOwnProperty("unit")
			) {
				newLi.innerHTML = `<b>${ingredient.ingredient}:</b> ${ingredient.quantity} ${ingredient.unit}`;
			} else if (ingredient.hasOwnProperty("quantity")) {
				newLi.innerHTML = `<b>${ingredient.ingredient}:</b> ${ingredient.quantity}`;
			} else {
				newLi.innerHTML = `<b>${ingredient.ingredient}</b>`;
			}

			ul.appendChild(newLi);
		}
	});
}

// je selectionne l'ul des tags et je vide le contenu
const ulTagsIngredients = document.querySelector(".tags");
const ulTagsAppareils = document.querySelector(".tags2");
const ulTagsUstensiles = document.querySelector(".tags3");

// j'applique le filtre sur les ingredients
async function getIngredients(filteredArr) {
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

async function filterByTags(filteredArr) {
	let currentIngredient = document.querySelector(".notif");

	const searchedString = currentIngredient.innerText.toLowerCase();

	const filteredArrByTags = [];

	// console.log(searchedString)

	// console.log(filteredArr);
	searchResult.innerHTML = "";
	// j'applique la recherche : au titre de la recette, à la description et aux ingrédients
	const filteredArr2 = filteredArr.filter((el) =>
		el.ingredients.forEach((ingredient) => {
			ingredient.ingredient.toLowerCase().includes(searchedString);
			// console.log(ingredient.ingredient.toLowerCase().includes(searchedString))
			if (ingredient.ingredient.toLowerCase().includes(searchedString)) {
				// console.log(el)
				filteredArrByTags.push(el);
			} else {
				console.log("je suis dans le else");
			}
		})
	);
	// console.log(filteredArrByTags)
	createRecipeList(filteredArrByTags);
	getIngredients(filteredArrByTags);
	getAppareils(filteredArrByTags);
	getUstensiles(filteredArrByTags);
}

// je crée ma fonction de filtres des données
function filterRecipes(e) {
	const searchedString = e.target.value.toLowerCase();

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

		// Dans ce cas si il y a des resultats, j'applique mon filtre et je crée les cartes qui correpondent
		createRecipeList(filteredArr);
		getIngredients(filteredArr);
		getAppareils(filteredArr);
		getUstensiles(filteredArr);

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
				/* -------------------------------------------------------------------------- */
				filterByTags(filteredArr);

				/* -------------------------------------------------------------------------- */
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
