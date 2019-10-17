const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true, select: false },
	recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
});


// userSchema.virtual('recipes', {
//     ref: 'Recipe',
//     localField: '_id',
//     foreignField: 'recipes'
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
