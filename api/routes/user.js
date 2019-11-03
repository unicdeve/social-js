const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');

// Controllers
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserImage,
    addFollowing,
    addFollower,
    removeFollower,
    removeFollowing
} = require('../controllers/user');


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


// @route GET api/users/:userId
// @desc Delete user
// @access Private
router.delete('/:userId', requireSignin, deleteUser);


// @route GET api/user/:userId
// @desc Get user photo
// @access Public
router.get('/photo/:userId', getUserImage);


// @route PUT api/user/follow
// @desc add following and follower
// @access Private
router.put('/follow', requireSignin, addFollower, addFollowing);


// @route PUT api/user/unfollow
// @desc add unfollowing
// @access Private
router.put('/unfollow', requireSignin, removeFollower, removeFollowing);


// @route PARAM api/auth/user
// @desc Get user by ID
// @access Public
router.param('userId', userById);

module.exports = router;