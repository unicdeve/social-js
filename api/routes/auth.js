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
// @access Public
router.get('/signout', signout);


// @route GET api/auth/user
// @desc Get user by ID
// @access Public
router.param('userId', userById);


module.exports = router;