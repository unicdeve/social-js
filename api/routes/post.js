const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validators');


// Controllers
const { getPosts, createPost } = require('../controllers/post');
const { userById } = require('../controllers/user');


// @route GET api/posts/test
// @desc Get all post route
// @access Public
router.get('/all', getPosts);

// @route POST api/post
// @desc Create new post route
// @access Public
router.post('/create', requireSignin, createPostValidator, createPost);

// @route PARAM api/auth/user
// @desc If request has userId parameter, execute userById() first
// @access Public
router.param('userId', userById);


module.exports = router;