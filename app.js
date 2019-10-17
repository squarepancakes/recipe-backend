const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "test") {
	require("./db");
}

app.use(express.json());

app.use(cookieParser());

const index = require("./routes/index");
app.use("/", index);

const recipes = require("./routes/recipes");
app.use("/recipes", recipes);

const users = require("./routes/users");
app.use("/users", users);

module.exports = app;
