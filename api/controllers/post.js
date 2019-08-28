const Post = require('../models/post');

exports.getPosts = (req, res) => {
    const posts = Post.find().select("_id body title")
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json({error: err}));
};

exports.createPost = (req, res) => {
    const newPost = new Post(req.body);
    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(400).json({ error: err }))
}


