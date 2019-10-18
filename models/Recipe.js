const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
	name: String,
	ingredients: [String],
	instructions: [String],
	categories: {
		type: [
			{
				type: String
			}
		]
	},
	time: String,
	serving: String,
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
