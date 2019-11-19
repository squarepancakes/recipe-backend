const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "test") {
	require("./db");
}

const corsOptions = {
	credentials: true,
	allowedHeaders: "content-type",
	origin: [
		"http://localhost:3000",
		"http://localhost:4000",
		"https://app-etizer.netlify.com",
		"https://app-etizer.herokuapp.com"
	]
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

const index = require("./routes/index");
app.use("/", index);

const recipes = require("./routes/recipes");
app.use("/recipes", recipes);

const users = require("./routes/users");
app.use("/users", users);

module.exports = app;
