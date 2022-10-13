class Appareils {
	constructor(appareils) {
		this.appareils = appareils;
	}

	createAppareils() {
		let newLi = document.createElement("li");
		newLi.classList.add("tags-item-appareils");
		newLi.innerText = this.appareils;
		return newLi;
	}
}
