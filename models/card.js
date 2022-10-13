let mongoose = require("mongoose");

let cardSchema = new mongoose.Schema({
	bizName: String,
	description: String,
	address: String,
	tel: String,
	img: String,
	uniqueNum: {
		type: Number,
		unique: true,
	},
	userId: mongoose.ObjectId,
});

let Cards = mongoose.model("cards", cardSchema);

module.exports = Cards;