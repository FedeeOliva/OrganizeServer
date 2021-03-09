const {Schema, model} = require('mongoose');

const BoardSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	imageID:{
		type: String,
		required: true,
		trim: true,
	},		
	lists: {
		type: Array,
		default: []
	}
});

module.exports = model('Board', BoardSchema);