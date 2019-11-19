const mongoose = require("mongoose");
let dbURL;

if(process.env.NODE_ENV === "development") {
	const dbName = "recipes-db";
	dbURL = `mongodb://localhost/${dbName}`;
}

if(process.env.NODE_ENV === "production") {
dbURL = process.env.MONGO_URI;
}


mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(dbURL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
	console.log("Mongoosing recipes on MongoDB");
});

module.exports = db;
