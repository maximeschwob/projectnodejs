const express = require("express");
const auth = require("../middlewares/auth");
const Cards = require("../models/Card");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/:bizCardID", auth, async (req, res) => {
	let userData = await Cards.findById(req.params.bizCardID);
	if (userData.userId.toString() !== res.locals.user._id) return res.status(401).send("Oops Error ❌: Your are not unauthorized to see this data");
	return res.status(200).send(userData);
});

module.exports = router;