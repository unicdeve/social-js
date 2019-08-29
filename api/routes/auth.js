const express = require('express');
const router = express.Router();
const { userSignupValidator } = require('../validators');


// Controllers
const { signup } = require('../controllers/auth');


// @route POST api/post
// @desc Create new user route
// @access Public
router.post('/signup', userSignupValidator, signup);


module.exports = router;