const {Schema, model} = require('mongoose');

const TaskSchema = new Schema({
	name:{
		type: String,
		required: true,
		trim: true
	}
},{timestamps: true})

Task = model('Task', TaskSchema);

module.exports = {Task, TaskSchema};