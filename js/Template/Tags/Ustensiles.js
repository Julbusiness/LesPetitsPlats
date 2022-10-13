class Ustensiles {
	constructor(ustensiles) {
		this.ustensiles = ustensiles;
	}

	createUstensiles() {
		let newLi = document.createElement("li");
		newLi.classList.add("tags-item-ustensiles");
		newLi.innerText = this.ustensiles;
		return newLi;
	}
}
