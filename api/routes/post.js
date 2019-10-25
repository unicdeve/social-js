const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validators');


// Controllers
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    deletePost,
    updatePost
} = require('../controllers/post');
const { userById } = require('../controllers/user');


// @route GET api/posts/all
// @desc Get all post route
// @access Public
router.get('/all', getPosts);

// @route GET api/posts/by/:userId
// @desc Get all post by :userId
// @access Private
router.get('/by/:postId', requireSignin, postsByUser);

// @route DELETE api/posts/:postId
// @desc Delete post :postId
// @access Public
router.delete('/:postId', requireSignin, isPoster, deletePost);

// @route PUT api/post
// @desc Update post
// @access Private
router.put('/:postId', requireSignin, requireSignin, isPoster, updatePost);


// @route POST api/post
// @desc Create new post route
// @access Private
router.post('/new/:postId', requireSignin, createPost, createPostValidator);

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