const {Schema, model} = require('mongoose');

const TaskSchema = new Schema({
	_id :{
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true,
		trim: true
	}
},{timestamps: true})

Task = model('Task', TaskSchema);

module.exports = {Task, TaskSchema};