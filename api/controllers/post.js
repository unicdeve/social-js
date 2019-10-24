const Post = require('../models/post');
const fs = require('fs');
// const formidable = require('formidable') // will install package

exports.getPosts = (req, res) => {
    const posts = Post.find().select("_id body title")
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json({error: err}));
};

exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) res.status(400).json({ error: "Image could not be uploaded.."});
        let newPost = new Post(fields);
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