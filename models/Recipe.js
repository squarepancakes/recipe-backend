class Recipes {
	constructor() {
		this.recipes = [
			{ title: 1, ingredients: ["apple", "banana", "pear"] },
			{ title: 2, ingredients: ["poppy", "lime"] }
		];
	}

	getAllRecipes() {
		return this.recipes;
	}
}

module.exports = new Recipes();
