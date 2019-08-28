const Post = require('../models/post');

exports.getPosts = (req, res) => {
    res.send("Hello world from posts")
};

exports.createPost = (req, res) => {
    const newPost = new Post(req.body);
    newPost.save((err, post) => {
        if(err) res.status(400).json({ error: err });
        res.status(200).json(post)
    })
}


