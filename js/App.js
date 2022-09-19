class App {
	constructor() {
		this.$recipesWrapper = document.querySelector(".cards");
		this.$ingredientsWrapper = document.querySelector(".tags");
		this.$appareilsWrapper = document.querySelector(".bloc-links2");
		this.$ustensilesWrapper = document.querySelector(".bloc-links3");
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
}

const app = new App();
app.fetchRecipes();
app.fetchIngredients();
