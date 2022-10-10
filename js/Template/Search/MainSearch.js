const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector(".cards");

// je crée une variable pour mon array
let dataArray;

// je déclenche un nouveau fetch des données
async function getRecipes() {
	const res = await fetch("/data/recipes.json");

	const results = await res.json();
	// console.log(results);

	dataArray = results.recipes;
	// console.log(dataArray);
}

// j'appel getUsers
getRecipes();

// je crée la structure de ma nouveau carte
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

// je place mon listener sur l'input
searchInput.addEventListener("input", filterData);

// je crée ma fonction de filtres des données
function filterData(e) {
	console.log(e);

	
	const searchedString = e.target.value.toLowerCase();
	
	if (searchedString.length > 2) {
		
		// Je vide mon content qui contient les cards
		searchResult.innerHTML = "";

		const filteredArr = dataArray.filter(
			(el) => el.name.toLowerCase().includes(searchedString) 
			|| el.appliance.toLowerCase().includes(searchedString) 
			// || el.ustensils.toLowerCase().includes(searchedString) 
			// || el.ingredients.ingredient.toLowerCase().includes(searchedString) 
		);
		createRecipeList(filteredArr);
	} else {
		createRecipeList(dataArray)
	}
}
