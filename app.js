const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express());

app.use(cookieParser());

// const middleware = (req, res, next) => {
// 	next();
// };
// app.use(middleware)

const index = require("./routes/index");
app.use("/", index);

const recipes = require("./routes/recipes");
app.use("/recipes", recipes);

module.exports = app;
