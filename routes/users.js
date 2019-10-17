const express = require("express");
const router = express.Router();
const User = require("../models/User");
const token = "Hsf979EUHFIUWN123erfwsw3eruf00j1QJKhdg537GS";

router.get("/", async (req, res, next) => {
	try {
		const usersList = await User.find(); //.populate("recipes");
		res.send(usersList);
	} catch (err) {
		next(err);
	}
});

router.get("/:name", async (req, res, next) => {
	try {
		const usersList = await User.findOne({
			username: req.params.name
		}).populate("recipes");
		res.send(usersList);
	} catch (err) {
		next(err);
	}
});

router.post("/new", async (req, res, next) => {
	try {
		const newUserDetails = req.body;
		const newUser = new User(newUserDetails);

		await User.init();
		const oneUser = await newUser.save();
		res.send(oneUser);
	} catch (err) {
		next(err);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		console.log(user);
		if (password !== user.password) {
			throw new Error("Login failed");
		}

		res.cookie("token", token);
		res.send(user);
	} catch (err) {
		if (err.message === "Login failed") {
			err.status = 400;
		}
		next(err);
	}
});

router.post("/logout", async (req, res) => {
	res.clearCookie("token").send("You are now logged out!");
});

router.patch("/:id", async (req, res, next) => {
	try {
		const userId = req.params.id;
		const newUserInfo = req.body;
		const updateUserInfo = await User.findByIdAndUpdate(userId, newUserInfo, {
			new: true
		});
		res.send(`Updated ${updateUserInfo}`);
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const userId = req.params.id;
		await User.findByIdAndDelete(userId);
		res.send("User deleted");
	} catch (err) {
		next(err);
	}
});

module.exports = router;
