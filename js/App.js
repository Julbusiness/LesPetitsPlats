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
		// console.log('je passe dans fetchRecipes APP')
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
		// console.log('je passe dans fetchIngredients APP')

		// je recupere mes données ingredients
		const IngredientsData = await this.dataApi.getIngredients();

		// je boucle sur mon tableau pour créer mes cartes d'ingredients
		IngredientsData.forEach((ingredients) => {
			const Template = new Ingredients(ingredients);
			this.$ingredientsWrapper.appendChild(Template.createIngredients());
		});
	}
	/* -------------------------------------------------------------------------- */
	/* ---------- fetch des données recettes pour la création du tag Appareils --------- */
	async fetchAppareils() {
		// console.log('je passe dans fetchAppareils APP')
		const AppareilsData = await this.dataApi.getAppareils();

		AppareilsData.forEach((appareils) => {
			const Template = new Appareils(appareils);
			this.$appareilsWrapper.appendChild(Template.createAppareils());
		});

		let tags = document.querySelectorAll(".tags-item-appareils");
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				toggleDropDownAppareils();
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
		// console.log('je passe dans fetchUstensiles APP')
		const UstensilesData = await this.dataApi.getUstensiles();

		UstensilesData.forEach((ustensiles) => {
			const Template = new Ustensiles(ustensiles);
			this.$ustensilesWrapper.appendChild(Template.createUstensiles());
		});

		let tags = document.querySelectorAll(".tags-item-ustensiles");
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				toggleDropDownUstensiles();
				const tag = li.innerHTML;
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
		// console.log('je passe dans mainSearch APP')

		const searchInput = document.querySelector("#search-input");
		searchInput.addEventListener("input", filterRecipes);
	}
	/* -------------------------------------------------------------------------- */
	/* ------------------------ recherche par ingrédients ----------------------- */
	async ingredientsSearch() {
		// je met mon listener sur l'input pour les ingredients
		// console.log("je passe dans filterIngredientsByInput APP");
		const ingredientsInput = document.querySelector("#ingredients-search");
		ingredientsInput.addEventListener("input", filterIngredientsByInput);

		let tags = document.querySelector(".tags");
		let closeTag = document.querySelector(".tags-card-ul");

		// je met mon listener sur le click du bouton ingredients
		tags.addEventListener("click", (e) => {
			let currentTag = e.target;
			const tag = currentTag.innerHTML;
			const color = "primary";
			const liItem = currentTag;

			toggleDropDownIngredients();
			filterIngredientsByClick(tag, color, liItem);
		});
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
app.mainSearch();
app.ingredientsSearch();
