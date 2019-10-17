const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const User = require("../models/User");

router.get("/", async (req, res, next) => {
	try {
		let query = req.query;
		let matchedRecipes;

		const hasMultipleCategories =
			query.catergories &&
			Array.isArray(query.catergories) &&
			query.catergories.length > 1;

		if (hasMultipleCategories) {
			query = { catergories: { $all: [...query.catergories] } };
		}

		matchedRecipes = await Recipe.find(query);
		res.send(matchedRecipes);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const recipeId = req.params.id;
		const recipe = await Recipe.findById(recipeId);
		if (!recipe) {
			throw new Error("Recipe does not exist");
		}
		res.send(recipe);
	} catch (err) {
		console.error("Cannot find recipe!");
		next(err);
	}
});

router.post("/new", async (req, res, next) => {
	try {
		const newRecipeDetails = req.body;
		const newRecipe = new Recipe(newRecipeDetails);
		await Recipe.init();
		const savedRecipe = await newRecipe.save();
		const recipeId = savedRecipe._id;
		const userId = newRecipeDetails.user;
		const user = await User.findById(userId);
		user.recipes.push(recipeId);
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		console.error("Cannot save new recipe");
		next(err);
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const recipeId = req.params.id;
		const newDetailsOfRecipe = req.body;
		const updateRecipe = await Recipe.findByIdAndUpdate(
			recipeId,
			newDetailsOfRecipe,
			{ new: true }
		);
		res.send(updateRecipe);
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const recipeId = req.params.id;
		await Recipe.findByIdAndDelete(recipeId);
		const allRecipes = await Recipe.find();
		res.send(allRecipes);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
