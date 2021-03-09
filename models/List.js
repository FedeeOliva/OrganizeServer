const {Schema, model} = require('mongoose');
const {TaskSchema} = require('./Task');

const ListSchema = new Schema({	
	name:{
		type: String,
		required: true,
		trim: true
	},
	tasks:{
		type: [TaskSchema],
		default: []
	},
	board:{
		type: Schema.Types.ObjectId,
		ref: 'Board'
	}

	})

module.exports = model('List', ListSchema);