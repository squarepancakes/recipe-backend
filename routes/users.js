const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res, next) => {
	try {
		const usersList = await User.find();
		res.send(usersList);
	} catch (err) {
		next(err);
	}
});

router.get("/me", async (req, res) => {
	try {
		const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
		res.json({ username: decoded.name, id: decoded._id });
	} catch (err) {
		res.sendStatus(401);
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
		if (!user) {
			throw new Error("User does not exist! Please register!");
		}
		const checkPassword = await bcrypt.compare(password, user.password);
		if (!checkPassword) {
			throw new Error("Wrong password");
		}
		const payload = { name: user.username, id: user._id };

		const token = jwt.sign(payload, process.env.JWT_KEY);

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

router.patch("/:name", async (req, res, next) => {
	try {
		const user = req.params.name;
		const newUserInfo = req.body;
		const updateUserInfo = await User.findOneAndUpdate(
			{ username: user },
			newUserInfo,
			{
				new: true
			}
		);
		res.send(`Updated ${updateUserInfo}`);
	} catch (err) {
		next(err);
	}
});

router.delete("/:name", async (req, res, next) => {
	try {
		const user = req.params.name;
		await User.findOneAndDelete({ username: user });
		res.send("User deleted");
	} catch (err) {
		next(err);
	}
});

module.exports = router;
