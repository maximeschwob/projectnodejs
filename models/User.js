let mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken');


let userSchema = new mongoose.Schema({
    name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	biz: {
		type: Boolean,
		required: false,
	}
})

// add method to schema to add token to user documents
userSchema.methods.genToken = async function () {
    const token =  jwt.sign({_id : this._id, biz : this.biz},process.env.ACCESS_TOKEN)
    return token
}

const User = mongoose.model('users',userSchema)

module.exports = User;