const dropdown = document.querySelector(".ingredients");
const dropdown2 = document.querySelector(".appareils");
const dropdown3 = document.querySelector(".ustensiles")

const blocLinks = document.querySelector(".bloc-links");
const blocLinks2 = document.querySelector(".bloc-links2");
const blocLinks3 = document.querySelector(".bloc-links3");

const btnDrop = document.querySelector("#ingredients-search");
const btnDrop2 = document.querySelector("#appareils-search");
const btnDrop3 = document.querySelector("#ustensiles-search");

const liItems = document.querySelectorAll(".ingredients li");
const liItems2 = document.querySelectorAll(".appareils li");
const liItems3 = document.querySelectorAll(".ustensiles li");

const shortTitle = document.querySelector(".short-title-ingredients");
const shortTitle2 = document.querySelector(".short-title-appareils");
const shortTitle3 = document.querySelector(".short-title-ustensiles");

const tags = document.querySelector(".tags");
const tags2 = document.querySelector(".tags2");
const tags3 = document.querySelector(".tags3");

let toggleIndex;
let toggleIndex2;
let toggleIndex3;

btnDrop.addEventListener("click", toggleDropDownIngredients);
btnDrop2.addEventListener("click", toggleDropAppareils);
btnDrop3.addEventListener("click", toggleDropUstensiles);

function toggleDropDownIngredients() {
	if (!toggleIndex) {
		dropdown.style.height = "";
		blocLinks.style.height = `${blocLinks.scrollHeight}px`;
		dropdown.style.width = "100%";
		shortTitle.innerText = "Rechercher un ingrédient";
		shortTitle.style.opacity = "50%";
		btnDrop.classList.add("open");
		dropdown2.style.height = "69px";
		dropdown3.style.height = "69px";
		toggleIndex = true;

		blocLinks2.style.height = 0;
		dropdown2.style.width = "170px";
		shortTitle2.innerText = "Appareils";
		shortTitle2.style.opacity = "100%";
		btnDrop2.classList.remove("open2");

		blocLinks3.style.height = 0;
		dropdown3.style.width = "170px";
		shortTitle3.innerText = "Ustensiles";
		shortTitle3.style.opacity = "100%";
		btnDrop3.classList.remove("open3");
		toggleIndex3 = false;
		return;
	}

	
	blocLinks.style.height = 0;
	dropdown.style.width = "170px";
	shortTitle.innerText = "Ingredients";
	shortTitle.style.opacity = "100%";
	btnDrop.classList.remove("open");
	toggleIndex = false;
	}

function toggleDropAppareils() {
	if (!toggleIndex2) {
		dropdown2.style.height = "";
		blocLinks2.style.height = `${blocLinks2.scrollHeight}px`;
		dropdown2.style.width = "100%";
		shortTitle2.innerText = "Rechercher un appareil";
		shortTitle2.style.opacity = "50%";
		btnDrop2.classList.add("open2");
		dropdown.style.height = "69px";
		dropdown3.style.height = "69px";
		toggleIndex2 = true;

		blocLinks.style.height = 0;
		dropdown.style.width = "170px";
		shortTitle.innerText = "Ingrédients";
		shortTitle.style.opacity = "100%";
		btnDrop.classList.remove("open");

		blocLinks3.style.height = 0;
		dropdown3.style.width = "170px";
		shortTitle3.innerText = "Ustensiles";
		shortTitle3.style.opacity = "100%";
		btnDrop3.classList.remove("open3");
		toggleIndex3 = false;
		return;
	}

	blocLinks2.style.height = 0;
	dropdown2.style.width = "170px";
	shortTitle2.innerText = "Appareils";
	shortTitle2.style.opacity = "100%";
	btnDrop2.classList.remove("open2");
	toggleIndex2 = false;
}

function toggleDropUstensiles() {
	if (!toggleIndex3) {
		dropdown3.style.height = "";
		blocLinks3.style.height = `${blocLinks3.scrollHeight}px`;
		dropdown3.style.width = "100%";
		shortTitle3.innerText = "Rechercher un ustensile";
		shortTitle3.style.opacity = "50%";
		btnDrop3.classList.add("open3");
		dropdown.style.height = "69px";
		dropdown2.style.height = "69px"
		toggleIndex3 = true;

		blocLinks.style.height = 0;
		dropdown.style.width = "170px";
		shortTitle.innerText = "Ingrédients";
		shortTitle.style.opacity = "100%";
		btnDrop.classList.remove("open");
		toggleIndex = false;
	
		blocLinks2.style.height = 0;
		dropdown2.style.width = "170px";
		shortTitle2.innerText = "Appareils";
		shortTitle2.style.opacity = "100%";
		btnDrop2.classList.remove("open2");
		toggleIndex2 = false;
		return;
	}

	blocLinks3.style.height = 0;
	dropdown3.style.width = "170px";
	shortTitle3.innerText = "Ustensiles";
	shortTitle3.style.opacity = "100%";
	btnDrop3.classList.remove("open3");
	toggleIndex3 = false;
}

liItems.forEach((li) =>
	li.addEventListener("click", toggleDropDownIngredients)
);
liItems2.forEach((li) => li.addEventListener("click", toggleDropAppareils));
liItems3.forEach((li) => li.addEventListener("click", toggleDropUstensiles));
