const _ = require('lodash');
const User = require('../models/user');
const fs = require('fs');
const formidable = require('formidable');


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
        if(err || !user) return res.status(400).json({error: "User not found"})
        req.profile = user;     // append profile with user info to req
        next()
    })
};


exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(400).json({error: "Photo could not be uploaded!"});
        let user = req.profile;
        user = _.extend(user, fields);
        user.updated = Date.now();
        if(files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }
        user.save((err, result) => {
            if(err) res.status(400).json({error: err})
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        })
    })
}


exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, user) => {
        if(err) res.status(400).json({error: err});
        res.json({ message: "User deleted successfully" });
    })
}


exports.getUserImage = (req, res, next) => {
    if(req.profile.photo.data) {
        res.set(("Content-Type", req.profile.photo.contentType))
        return res.send(req.profile.photo.data);
    }
    next();
}


exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!authorized) res.status(403).json({error: "User not authorized to perform this action."});
    next();
};