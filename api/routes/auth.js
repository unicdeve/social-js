const express = require('express');
const router = express.Router();
const { userSignupValidator } = require('../validators');


// Controllers
const { signup, signin } = require('../controllers/auth');


// @route POST api/auth/signin
// @desc Create new user
// @access Public
router.post('/signup', userSignupValidator, signup);


// @route POST api/auth/signin
// @desc Signin user
// @access Public
router.post('/signin', signin);


module.exports = router;