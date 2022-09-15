class Card {
	constructor(recipe) {
		this._recipe = recipe;
	}

	/* -------------------------------------------------------------------------- */
	/* --------------------- creation des cartes de recette --------------------- */
	createRecipeCard() {
		const $wrapper = document.createElement("div");
		$wrapper.classList.add("card");

		const ingredients = this._recipe.ingredients;
		// console.log(ingredients);

    
		const recipeCard = `
    
    <img src="../../logo/img.png" class="card-img-top" alt="">
    <div class="detail">
      <div class="card-body">
      <h3 class="card-text">${this._recipe.name}</h3>
      <ul class="list-group"></ul>
      </div>
      <div class="time">
        <div class="delay">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-clock" viewBox="0 0 16 16">
          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
          </svg></span>
          <p class="timing">${this._recipe.time} min</p>
        </div>
        <p class="explain text-wrap text-truncate">${this._recipe.description}</p>
      </div>
    </div>
    
    `;
    
		/* -------------------------------------------------------------------------- */
		$wrapper.innerHTML = recipeCard;
		const ul = $wrapper.querySelector('.list-group');
		// console.log(ul);

		for (const ingredient of ingredients) {
      
			let newLi = document.createElement("li");
			newLi.classList.add("list-group-item");

      if (ingredient.hasOwnProperty("quantity") && ingredient.hasOwnProperty("unit")){
        newLi.innerHTML = `<b>${ingredient.ingredient}:</b> ${ingredient.quantity} ${ingredient.unit}`;  
      } else if (ingredient.hasOwnProperty("quantity")){
        newLi.innerHTML = `<b>${ingredient.ingredient}:</b> ${ingredient.quantity}`;
      } else {
        newLi.innerHTML = `<b>${ingredient.ingredient}</b>`;
      }

      ul.appendChild(newLi);

		}

		return $wrapper;
	}
}
