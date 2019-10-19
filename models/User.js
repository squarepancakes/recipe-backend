const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
});

userSchema.pre("save", async function(next) {
	if (!this.isModified("password")) return next();

	const rounds = 7;
	this.password = await bcrypt.hash(this.password, rounds);
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
