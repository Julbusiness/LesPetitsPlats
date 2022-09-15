class Api {
	constructor(url) {
		this._url = url;
		// console.log(this._url);
	}

	async getRecipes() {
		try {
			const responseApi = await fetch(this._url);
			const responseJSON = await responseApi.json();
			const recipe = responseJSON.recipes;
			// console.log(responseApi);
			// console.log(responseJSON);
			return recipe;
		} catch (err) {
			console.log("La requete api getRecipes a échoué : ", err);
			return null;
		}
	}
}
