const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true,
		ref: 'user'
	},
	date: {
		type: Date,
		default: Date.now
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: 'post'
	}
});

module.exports = Comment = mongoose.model('comment', CommentSchema);