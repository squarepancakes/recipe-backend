const express = require("express")
const router = express.Router();

router.get("/", (req, res) => res.send("All recipes!"));

module.exports = router