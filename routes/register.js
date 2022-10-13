const express = require("express");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// define Joi Scheme to validate the data
const formJoiSchema = object({
	name: string().min(2).max(12).required(),
	email: string().email().required(),
	password: string().min(6).max(12).required(),
	biz: boolean().required(),
});

router.post("/", async (req, res) => {
	try {
		// * validate user input
		const { error } = formJoiSchema.validate(req.body);
		if (error) return res.status(400).send(error.message);

		//*check if user exists in database
		let user = await findOne({ email: req.body.email });
		if (user) return res.status(400).send("Sorry: User already exists");

		//*add new user
		user = new User(req.body);

		// * encryt password 
		const salt = await genSalt(10);

		user.password = await hash(user.password, salt);
		// * create token 


		const genToken = sign(
			{
				_id: user._id,
				biz: user.biz,

			},
			process.env.jwtkey
		) ;


	
		await user.save();
	 res.status(201).send({
			token: genToken,
			details:_.pick(user,["_id","name","email"]),
		});
	} catch (error) {
		res.status(400).send("error in register the user: " + error);
	}
});




export default router;