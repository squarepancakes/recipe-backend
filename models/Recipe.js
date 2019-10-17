const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
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
	serving: String,
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports  = Recipe;
