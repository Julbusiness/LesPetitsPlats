class Ingredients {
	constructor(ingredients) {
		this._ingredients = ingredients;
	}


	createIngredients() {
			let newLi = document.createElement("li");
			newLi.classList.add("list-item-ingredients");
			newLi.innerText = this._ingredients;
			return newLi;
		}

}
