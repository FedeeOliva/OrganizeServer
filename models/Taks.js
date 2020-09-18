const {Schema, model} = require('mongoose');

const TaksSchema = new Schema({
	name:{
		type: String,
		required: true,
		trim: true
	}
},{timestamps: true})

module.exports = model('Taks', TaksSchema);