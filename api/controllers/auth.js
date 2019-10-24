const jwt = require("jsonwebtoken");
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require('../models/user');

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) return res.status(403).json({ error: "Email is taken" })
    const user = await new User(req.body)
    await user.save()
    res.json({message: "Signup success! Please login."})
}


exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup"
            });
        }
        // create authenticate method in model
        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and password do not match"
            })
        }
        // generate token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token in the cookie
        res.cookie("t", token, { expire: new Date() + 9999})
        const { _id, name, email } = user;
        return res.json({token, user: { _id, email, name } });
    })
}


exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({message: "Signout success!"});
};


exports.requireSignin = expressJwt({
    // if token is valid, jwt appends the verified userId
    // in an auth key to the req object: req.auth
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});