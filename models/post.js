const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	category: {
		type: String,
		default: 'none'
	},
	isShow: {
		type: Boolean,
		default: true
	},
	owner: {
		type: String,
		required: true
	},
	isHead: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	},
	image: {
		type: String,
	},
});

module.exports = Post = mongoose.model('post', PostSchema);