const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
	name:{
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	lastname: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	registrydate: {
		type: Date,
		default: Date.now()
	}

});

module.exports = model('User', UserSchema);