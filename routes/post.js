const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');

const Post = require('../models/post');
const Comment = require('../models/comment');
const validatePostInput = require('../validation/post');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
	},
	flename: (req, file, cb) => {
		cb(null, Date.now() + file.originalName);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSie: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

router.get('/all', (req, res) => {
	Post.find({}).sort({date: -1}).limit(6)
		.then(posts => {
			Post.countDocuments({})
				.then(postCount => res.json({ posts, postCount }))
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
});

router.get('/loadmore/:length', (req, res) => {
	const length = Number.parseInt(req.params.length)

	Post.find({}).skip(length).sort({date: -1}).limit(6)
		.then(posts => res.json(posts))
		.catch(err => res.json(err))
})

router.get('/get/:id', (req, res) => {
	const { id } = req.params;

	Post.findOne({'_id': id})
		.then(post => {
			Comment.find({'post': post._id}).sort({date: -1})
				.then(comments => res.json({
					post: post,
					comments: comments
				}))
				.catch(err => res.status(500).json('Error'))
		})
	.catch(err => res.status(500).json('Post not found'));
});

router.post('/addcomment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { comment } = req.body;
	const { id } = req.params;
	const { login } = req.user;
	const data = {
		content: comment,
		author: login,
		post: id
	};

	new Comment(data).save()
		.then(comment => res.json(comment))
		.catch(err => res.json(err));

});

router.post('/create', upload.single('file'), passport.authenticate('jwt', { session: false }), (req, res) => {
	const { title, content, category } = req.body;
	const { errors, isValid } = validatePostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	
	if (req.user.role === 'admin') {
		let image = null;
		
		if (req.file) {
			image = req.file.path;
		}

		const data = {
			title: title,
			content: content,
			category: category,
			owner: req.user.login,
			image: image
		};

		new Post(data).save()
			.then(post => res.json(post))
			.catch(err => console.log(err));
	} else {
		res.status(400).json('Acces denied');
	}
});

module.exports = router;