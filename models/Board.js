const {Schema, model} = require('mongoose');
const {ListSchema} = require('./List');


const BoardSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	lists: {
		type: [ListSchema],
		default: []
	}},
	{
		timestamps: true
	}
	)

module.exports = model('Board', BoardSchema);