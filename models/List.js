const {Schema, model} = require('mongoose');
const Task = require('./Taks');

const ListSchema = new Schema({
	name:{
		type: String,
		required: true,
		trim: true
	},
	/*task:[Task]*/

	})

const List = model('List', ListSchema);

module.exports = {List, ListSchema};