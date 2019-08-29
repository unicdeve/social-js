const User = require('../models/user');


exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if(err) res.status(400).json({error: err})
        res.json(users)
    }).select("name email updated created");
};


exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) res.status(400).json({error: "User not found"})
        req.profile = user;     // append profile with user info to req
        next()
    })
}


exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if(!authorized) res.status(403).json({error: "User not authorized to perform this action."})
}