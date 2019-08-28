const express = require('express');
const router = express.Router();


// Controllers
const postControllers = require('../controllers/post');


// @route GET api/posts/test
// @desc Test post route
// @access Public
router.get('/all', postControllers.getPosts);

// @route POST api/post
// @desc Test post route
// @access Public
router.post('/create', postControllers.createPost);


module.exports = router;