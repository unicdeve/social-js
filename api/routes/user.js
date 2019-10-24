const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');

// Controllers
const { userById, allUsers, getUser, updateUser } = require('../controllers/user');


// @route GET api/user/all
// @desc Get all user
// @access Public
router.get('/all', allUsers);


// @route GET api/users/:userId
// @desc Get user by _id
// @access Private
router.get('/:userId', requireSignin, getUser);


// @route GET api/users/:userId
// @desc Get user by _id
// @access Private
router.put('/:userId', requireSignin, updateUser);


// @route GET api/auth/user
// @desc Get user by ID
// @access Public
router.param('userId', userById);


module.exports = router;