const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validators');


// Controllers
const { getPosts, createPost, postsByUser, postById } = require('../controllers/post');
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
// @desc If request has userId param, execute userById() first,
// then add req.profile to the req body
// @access Public
router.param('userId', userById);

// @route PARAM api/post/:postId
// @desc If request has postId param, execute postById() first
// then add req.post to the req body
// @access Public
router.param('postId', postById);


module.exports = router;