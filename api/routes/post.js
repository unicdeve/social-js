const express = require('express');
const router = express.Router();
const validator = require('../validators');


// Controllers
const postControllers = require('../controllers/post');


// @route GET api/posts/test
// @desc Get all post route
// @access Public
router.get('/all', postControllers.getPosts);

// @route POST api/post
// @desc Create new post route
// @access Public
router.post(
    '/create',
    validator.createPostValidator,
    postControllers.createPost
);


module.exports = router;