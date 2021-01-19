const {Schema, model} = require('mongoose');
const {TaskSchema} = require('./Task');

const ListSchema = new Schema({
	_id :{
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true,
		trim: true
	},
	tasks:{
		type: [TaskSchema],
		default: []
	}

	})

const List = model('List', ListSchema);

module.exports = {List, ListSchema};