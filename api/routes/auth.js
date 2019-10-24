const express = require('express');
const router = express.Router();
const { userSignupValidator } = require('../validators');


// Controllers
const { signup, signin, signout } = require('../controllers/auth');
const { userById } = require('../controllers/user');


// @route POST api/auth/signin
// @desc Create new user
// @access Public
router.post('/signup', userSignupValidator, signup);


// @route POST api/auth/signin
// @desc Signin user
// @access Public
router.post('/signin', signin);


// @route GET api/auth/signin
// @desc Sign out user
// @access Private
router.get('/signout', signout);


// @route PARAM api/auth/user
// @desc If request has userId parameter, execute userById() first
// @access Public
router.param('userId', userById);


module.exports = router;