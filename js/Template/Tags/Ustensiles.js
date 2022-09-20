class Ustensiles {
	constructor(ustensiles) {
		this.ustensiles = ustensiles;
	}

	createUstensiles() {
		let newLi = document.createElement("li");
		newLi.classList.add("list-item-ustensiles");
		newLi.innerText = this.ustensiles;
		return newLi;
	}
}
