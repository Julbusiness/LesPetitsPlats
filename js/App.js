class App {
	constructor() {
		this.$recipesWrapper = document.querySelector(".cards");
		this.$ingredientsWrapper = document.querySelector(".tags");
		this.$ingredientsTagsWrapper = document.querySelector(".tags-card-ul");
		this.$appareilsWrapper = document.querySelector(".tags2");
		this.$ustensilesWrapper = document.querySelector(".tags3");
		this.dataApi = new Api("/data/recipes.json");
		this.recipes = this.dataApi.getRecipes();
	}

	/* ---------- fetch des données recettes pour la création des cards --------- */
	async fetchRecipes() {
		// console.log('je suis ici')
		const recipesData = await this.recipes;

		recipesData
			.map((recipe) => new Recipe(recipe))
			.forEach((recipe) => {
				const Template = new Card(recipe);
				this.$recipesWrapper.appendChild(Template.createRecipeCard());
			});
	}
	/* -------------------------------------------------------------------------- */
	/* ---------- fetch des données recettes pour la création du tag Ingredients --------- */
	async fetchIngredients() {
		// je recupere mes données ingredients
		const IngredientsData = await this.dataApi.getIngredients();

		// je boucle sur mon tableau pour créer mes cartes d'ingredients
		IngredientsData.forEach((ingredients) => {
			const Template = new Ingredients(ingredients);
			this.$ingredientsWrapper.appendChild(Template.createIngredients());
		});

		let tags = document.querySelectorAll(".tags-item-ingredients");

		// je met mon listener sur le click du bouton ingredients
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				toggleDropDownIngredients();
			})
		);

		// je met mon listener sur mon le clicks des tags pour créer mes mini cartes ingredients
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				const tag = li.innerHTML;
				const color = "primary";
				const liItem = li;
				createTag(tag, color, liItem);
			})
		);
	}
	/* -------------------------------------------------------------------------- */
	/* ---------- fetch des données recettes pour la création du tag Appareils --------- */
	async fetchAppareils() {
		const AppareilsData = await this.dataApi.getAppareils();

		AppareilsData.forEach((appareils) => {
			const Template = new Appareils(appareils);
			this.$appareilsWrapper.appendChild(Template.createAppareils());
		});

		let tags = document.querySelectorAll(".tags-item-appareils");
		tags.forEach((li) => li.addEventListener("click", toggleDropDownAppareils));
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				const tag = li.innerHTML;
				const color = "success";
				const liItem = li;
				createTag(tag, color, liItem);
			})
		);
	}
	/* -------------------------------------------------------------------------- */
	/* ---------- fetch des données recettes pour la création du tag Ustensiles --------- */
	async fetchUstensiles() {
		const UstensilesData = await this.dataApi.getUstensiles();

		UstensilesData.forEach((ustensiles) => {
			const Template = new Ustensiles(ustensiles);
			this.$ustensilesWrapper.appendChild(Template.createUstensiles());
		});

		let tags = document.querySelectorAll(".tags-item-ustensiles");
		tags.forEach((li) =>
			li.addEventListener("click", toggleDropDownUstensiles)
		);
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				let tag = li.innerHTML;
				const color = "danger";
				const liItem = li;
				createTag(tag, color, liItem);
			})
		);
	}
	/* -------------------------------------------------------------------------- */
	/* -------------------------- recherche principale -------------------------- */
	async mainSearch() {
		// je met mon listener sur l'input pour les ingredients
		const searchInput = document.querySelector("#search-input");
		searchInput.addEventListener("input", filterRecipes);
	}
	/* -------------------------------------------------------------------------- */
	/* ------------------------ recherche par ingrédients ----------------------- */
	async IngredientsSearch() {
		// je met mon listener sur l'input pour les ingredients
		const ingredientsInput = document.querySelector("#ingredients-search");
		ingredientsInput.addEventListener("input", filterIngredients);
	}
	/* -------------------------------------------------------------------------- */
	/* ------------------------- recherche par appareils ------------------------ */

	/* -------------------------------------------------------------------------- */
	/* ------------------------ recherche par ustensiles ------------------------ */

	/* -------------------------------------------------------------------------- */
}

const app = new App();
app.fetchRecipes();
app.fetchIngredients();
app.fetchAppareils();
app.fetchUstensiles();
app.mainSearch()
app.IngredientsSearch()
