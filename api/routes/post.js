const express = require('express');
const router = express.Router();
const { createPostValidator } = require('../validators');


// Controllers
const { getPosts, createPost } = require('../controllers/post');


// @route GET api/posts/test
// @desc Get all post route
// @access Public
router.get('/all', getPosts);

// @route POST api/post
// @desc Create new post route
// @access Public
router.post('/create', createPostValidator, createPost);


module.exports = router;