class App {
	constructor() {
		this.$recipesWrapper = document.querySelector(".cards");
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
}

const app = new App();
app.fetchRecipes();
