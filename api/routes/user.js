const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');

// Controllers
const { userById, allUsers, getUser } = require('../controllers/user');


// @route GET api/user/all
// @desc Get all user
// @access Public
router.get('/all', allUsers);


// @route GET api/auth/signin
// @desc Get user by _id
// @access Public
router.get('/:userId', requireSignin, getUser);


// @route GET api/auth/user
// @desc Get user by ID
// @access Public
router.param('userId', userById);


module.exports = router;