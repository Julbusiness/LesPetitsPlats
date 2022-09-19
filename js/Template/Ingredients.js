class Ingredients {
	constructor(ingredients) {
		this._ingredients = ingredients;
		// console.log(this._ingredients);
	}

	/* -------------------------------------------------------------------------- */
	/* --------------------- creation des cartes des ingredients --------------------- */

	createIngredients() {


			let newLi = document.createElement("li");
			newLi.classList.add("list-group-item");
			newLi.innerText = this._ingredients;
			console.log(newLi);
			return newLi;

	}
}
