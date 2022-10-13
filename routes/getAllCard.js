const express = require("express");
const auth = require("../middlewares/auth");
const Cards = require("../models/Card");
const router = express.Router();

router.get("/", auth, async (req, res) => {
	try {
		let cardData = await Cards.find();
		if (cardData.length > 0) return res.status(200).send(cardData);
		return res.status(400).send("Oops Error ❌ Cannot find Document");
	} catch (error) {
		return res.status(400).send("error in GET all card: " + error);
	}
});

module.exports = router;
