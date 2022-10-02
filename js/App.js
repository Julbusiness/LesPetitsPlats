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
		const IngredientsData = await this.dataApi.getIngredients();
		// console.log(IngredientsData)

		IngredientsData.forEach((ingredients) => {
			const Template = new Ingredients(ingredients);
			this.$ingredientsWrapper.appendChild(Template.createIngredients());
		});

		let tags = document.querySelectorAll(".list-item-ingredients");
		tags.forEach((li) =>
			li.addEventListener("click", toggleDropDownIngredients)
		);
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				let tag = li.innerHTML;
				const color = "primary";
				createTags(tag, color);
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

		let tags = document.querySelectorAll(".list-item-appareils");
		tags.forEach((li) => li.addEventListener("click", toggleDropDownAppareils));
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				let tag = li.innerHTML;
				const color = "success";
				createTags(tag, color);
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

		let tags = document.querySelectorAll(".list-item-ustensiles");
		tags.forEach((li) =>
			li.addEventListener("click", toggleDropDownUstensiles)
		);
		tags.forEach((li) =>
			li.addEventListener("click", () => {
				let tag = li.innerHTML;
				const color = "danger";
				createTags(tag, color);
			})
		);
	}
	/* -------------------------------------------------------------------------- */
}

const app = new App();
app.fetchRecipes();
app.fetchIngredients();
app.fetchAppareils();
app.fetchUstensiles();
