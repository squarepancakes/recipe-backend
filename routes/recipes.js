const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

router.get("/", async (req, res, next) => {
    try {
        const allRecipes = await Recipe.getAllRecipes();
        res.send(allRecipes);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
