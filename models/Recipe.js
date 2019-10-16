const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
	id: Number,
	title: String,
	ingredients: Array,
	instructions: Array,
	catergories: {
		type: [
			{
				type: String,
				lowercase: true
			}
		]
	},
	time: String,
	serving: String
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
