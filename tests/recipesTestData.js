const applePie = {

	title: "apple pie",
	ingredients: ["apple", "butter"],
	instructions: ["pray"],
	categories: ["vegetarian", "dessert"]
};

const bananaBread = {

	title: "banana bread",
	ingredients: ["banana", "flour"],
	instructions: ["pray"],
	categories: ["vegetarian", "bread"]
};

const poachedPear = {
	
	title: "poached pear",
	ingredients: ["pear", "sugar"],
	instructions: ["pray"],
	categories: ["vegetarian", "dessert"]
};

const someOtherRecipe = {
	title: "some other recipe",
	ingredients: ["pear", "sugar"],
	instructions: ["pray"],
	categories: ["vegetarian", "dessert"]
};

const recipesTestData = [applePie, bananaBread, poachedPear];

module.exports.recipesTestData = recipesTestData;
module.exports.recipes = {
	applePie,
	bananaBread,
	poachedPear,
	someOtherRecipe
};

module.exports.breadCatergory = [bananaBread];
module.exports.dessertCatergory = [applePie, poachedPear];
