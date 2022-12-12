const dropdownIngredients = document.querySelector(".ingredients");
const dropdownAppareils = document.querySelector(".appareils");
const dropdownUstensiles = document.querySelector(".ustensiles");

const dropBtnIngredients = document.querySelector(".drop-btn-ingredients");
const dropBtnAppareils = document.querySelector(".drop-btn-appareils");
const dropBtnUstensiles = document.querySelector(".drop-btn-ustensiles");

const blocLinksIngredients = document.querySelector(".blocLinks-ingredients");
const blocLinksAppareils = document.querySelector(".blocLinks-appareils");
const blocLinksUstensiles = document.querySelector(".blocLinks-ustensiles");

const liItemsIngredients = document.querySelectorAll(".ingredients li");
const liItemsAppareils = document.querySelectorAll(".appareils li");
const liItemsUstensiles = document.querySelectorAll(".ustensiles li");

const shortTitleIngredients = document.querySelector(
	".short-title-ingredients"
);
const shortTitleAppareils = document.querySelector(".short-title-appareils");
const shortTitleUstensiles = document.querySelector(".short-title-ustensiles");

let toggleIndexIngredients;
let toggleIndexAppareils;
let toggleIndexUstensiles;

shortTitleIngredients.addEventListener("click", toggleDropDownIngredients);
shortTitleAppareils.addEventListener("click", toggleDropDownAppareils);
shortTitleUstensiles.addEventListener("click", toggleDropDownUstensiles);

dropBtnIngredients.addEventListener("click", toggleDropDownIngredients);
dropBtnAppareils.addEventListener("click", toggleDropDownAppareils);
dropBtnUstensiles.addEventListener("click", toggleDropDownUstensiles);

function toggleDropDownIngredients() {
	if (!toggleIndexIngredients) {
		dropdownIngredients.style.height = "390px";
		blocLinksIngredients.style.height = "390px";
		dropdownIngredients.style.width = "100%";
		shortTitleIngredients.setAttribute(
			"placeholder",
			"Rechercher un ingrédient"
		);
		shortTitleIngredients.style.opacity = "50%";
		shortTitleIngredients.classList.add("open");
		dropBtnIngredients.classList.add("open-svg");
		dropdownAppareils.style.height = "69px";
		dropdownUstensiles.style.height = "69px";
		toggleIndexIngredients = true;

		blocLinksAppareils.style.height = 0;
		dropdownAppareils.style.width = "170px";
		shortTitleAppareils.setAttribute("placeholder", "Appareils");
		shortTitleAppareils.style.opacity = "100%";
		shortTitleAppareils.classList.remove("open2");
		dropBtnAppareils.classList.remove("open-svg");

		blocLinksUstensiles.style.height = 0;
		dropdownUstensiles.style.width = "170px";
		shortTitleUstensiles.setAttribute("placeholder", "Ustensiles");
		shortTitleUstensiles.style.opacity = "100%";
		shortTitleUstensiles.classList.remove("open3");
		dropBtnUstensiles.classList.remove("open-svg");
		toggleIndexUstensiles = false;
		return;
	}

	blocLinksIngredients.style.height = 0;
	dropdownIngredients.style.width = "170px";
	dropdownIngredients.style.height = "69px";
	shortTitleIngredients.setAttribute("placeholder", "Ingrédients");
	shortTitleIngredients.style.opacity = "100%";
	shortTitleIngredients.classList.remove("open");
	dropBtnIngredients.classList.remove("open-svg");
	toggleIndexIngredients = false;
}

function toggleDropDownAppareils() {
	if (!toggleIndexAppareils) {
		dropdownAppareils.style.height = "390px";
		blocLinksAppareils.style.height = "390px";
		dropdownAppareils.style.width = "100%";
		shortTitleAppareils.setAttribute("placeholder", "Rechercher un appareil");

		shortTitleAppareils.style.opacity = "50%";
		shortTitleAppareils.classList.add("open2");
		dropBtnAppareils.classList.add("open-svg");
		dropdownIngredients.style.height = "69px";
		dropdownUstensiles.style.height = "69px";
		toggleIndexAppareils = true;

		blocLinksIngredients.style.height = 0;
		dropdownIngredients.style.width = "170px";
		shortTitleIngredients.setAttribute("placeholder", "Ingrédients");
		shortTitleIngredients.style.opacity = "100%";
		shortTitleIngredients.classList.remove("open");
		dropBtnIngredients.classList.remove("open-svg");

		blocLinksUstensiles.style.height = 0;
		dropdownUstensiles.style.width = "170px";
		shortTitleUstensiles.setAttribute("placeholder", "Ustensiles");
		shortTitleUstensiles.style.opacity = "100%";
		shortTitleUstensiles.classList.remove("open3");
		dropBtnUstensiles.classList.remove("open-svg");
		toggleIndexUstensiles = false;
		return;
	}

	blocLinksAppareils.style.height = 0;
	dropdownAppareils.style.width = "170px";
	dropdownAppareils.style.height = "69px";
	shortTitleAppareils.setAttribute("placeholder", "Appareils");
	shortTitleAppareils.style.opacity = "100%";
	shortTitleAppareils.classList.remove("open2");
	dropBtnAppareils.classList.remove("open-svg");
	toggleIndexAppareils = false;
}

function toggleDropDownUstensiles() {
	if (!toggleIndexUstensiles) {
		dropdownUstensiles.style.height = "390px";
		blocLinksUstensiles.style.height = "390px";
		dropdownUstensiles.style.width = "100%";
		shortTitleUstensiles.setAttribute("placeholder", "Rechercher un ustensile");
		
		shortTitleUstensiles.style.opacity = "50%";
		shortTitleUstensiles.classList.add("open3");
		dropBtnUstensiles.classList.add("open-svg");
		dropdownIngredients.style.height = "69px";
		dropdownAppareils.style.height = "69px";
		toggleIndexUstensiles = true;

		blocLinksIngredients.style.height = 0;
		dropdownIngredients.style.width = "170px";
		shortTitleIngredients.setAttribute("placeholder", "Ingrédients");
		shortTitleIngredients.style.opacity = "100%";
		shortTitleIngredients.classList.remove("open");
		dropBtnIngredients.classList.remove("open-svg");

		blocLinksAppareils.style.height = 0;
		dropdownAppareils.style.width = "170px";
		shortTitleAppareils.setAttribute("placeholder", "Appareils");
		shortTitleAppareils.style.opacity = "100%";
		shortTitleAppareils.classList.remove("open2");
		dropBtnAppareils.classList.remove("open-svg");
		toggleIndexAppareils = false;
		return;
	}

	blocLinksUstensiles.style.height = 0;
	dropdownUstensiles.style.width = "170px";
	dropdownUstensiles.style.height = "69px";
	shortTitleUstensiles.setAttribute("placeholder", "Ustensiles");
	shortTitleUstensiles.style.opacity = "100%";
	shortTitleUstensiles.classList.remove("open3");
	dropBtnUstensiles.classList.remove("open-svg");
	toggleIndexUstensiles = false;
}

// je crée le li de tags dynamiquement
function createTag(tag, color, liItem) {
	let tagsWrapper = document.querySelector(".tags-card-ul");

	let tagLi = document.createElement("li");
	tagLi.classList.add("btn");
	tagLi.classList.add(`btn-${color}`);
	tagLi.classList.add("notif");
	tagLi.innerHTML = tag;


	let imgClose = document.createElement("img");
	imgClose.src = "../../../Assets/close.png";
	imgClose.classList.add("close");


	imgClose.addEventListener("click", deleteTag);

	tagsWrapper.appendChild(tagLi);
	tagLi.appendChild(imgClose);
}
