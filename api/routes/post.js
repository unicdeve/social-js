const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validators');


// Controllers
const { getPosts, createPost, postsByUser } = require('../controllers/post');
const { userById } = require('../controllers/user');


// @route GET api/posts/all
// @desc Get all post route
// @access Public
router.get('/all', getPosts);

// @route GET api/posts/by/:userId
// @desc Get all post by :userId
// @access Public
router.get('/by/:userId', requireSignin, postsByUser);

// @route POST api/post
// @desc Create new post route
// @access Public
router.post('/new/:userId', requireSignin, createPost, createPostValidator);

// @route PARAM api/auth/user
// @desc If request has userId parameter, execute userById() first
// @access Public
router.param('userId', userById);


module.exports = router;