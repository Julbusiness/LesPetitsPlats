class App {
	constructor() {
		this.$recipesWrapper = document.querySelector(".cards");
		this.$ingredientsWrapper = document.querySelector(".tags");
		this.$appareilsWrapper = document.querySelector(".tags2");
		this.$ustensilesWrapper = document.querySelector(".tags3");
    this.dataApi = new Api("/data/recipes.json");
	}
  
	/* ---------- fetch des données recettes pour la création des cards --------- */
	async fetchRecipes() {
    // console.log('je suis ici')
		const recipesData = await this.dataApi.getRecipes();

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

		IngredientsData
			.forEach((ingredients) => {
				// console.log(typeof recipe)
				const Template = new Ingredients(ingredients);
				// console.log(Ingredients)
				this.$ingredientsWrapper.appendChild(Template.createIngredients());
			});
	}
	/* -------------------------------------------------------------------------- */
	/* ---------- fetch des données recettes pour la création du tag Appareils --------- */
	async fetchAppareils() {
		const AppareilsData = await this.dataApi.getAppareils();

		AppareilsData
			.forEach((appareils) => {
				const Template = new Appareils(appareils);
				this.$appareilsWrapper.appendChild(Template.createAppareils());
			});
	}
	/* -------------------------------------------------------------------------- */
	/* ---------- fetch des données recettes pour la création du tag Ustensiles --------- */
	async fetchUstensiles() {
		const UstensilesData = await this.dataApi.getUstensiles();

		UstensilesData
			.forEach((ustensiles) => {
				const Template = new Ustensiles(ustensiles);
				this.$ustensilesWrapper.appendChild(Template.createUstensiles());
			});
	}
}

const app = new App();
app.fetchRecipes();
app.fetchIngredients();
app.fetchAppareils();
app.fetchUstensiles();
