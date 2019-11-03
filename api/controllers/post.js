const Post = require('../models/post');
const _ = require('lodash');
const fs = require('fs');
const formidable = require('formidable') // will install package

exports.getPosts = (req, res) => {
    const posts = Post.find()
        .populate('postedBy', '_id name')
        .select("_id body title")
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json({error: err}));
};


exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "_id name")
        .exec((err, post) => {
            if (err) res.status(400).json({error: err});
            req.post = post;
            next();
        })
}


exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id})
        .populate("postedBy", "_id name")
        .sort("_created")
        .exec((err, posts) => {
            if(err) res.status(400).json({error: err})
            res.json(posts)
        })
}


exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if(!isPoster) res.status(403).json({error: "User is not authorized"});
    next();
}


exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body);
    post.updated = Date.now();
    post.save(err => {
        if (err) res.status(400).json({ error: err });
        res.json(post)
    })
}


exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, deletedPost) => {
        if(err) res.status(400).json({ error: err });
        res.json({message: "Post deleted succesfully"});
    })
}


exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) res.status(400).json({ error: "Image could not be uploaded.."});
        let newPost = new Post(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        newPost.postedBy = req.profile;

        if(files.photo) {
            newPost.photo.data = fs.readFileSync(files.photo.path);
            newPost.photo.contentType = files.photo.type;
        }
        newPost.save((err, result) => {
            if (err) res.status(400).json({error: err});
            res.json(result);
        })
    });
}