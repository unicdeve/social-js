const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        minLength: 4,
        maxLength: 150
    },
    body: {
        type: String,
        required: "Post body is required",
        minLength: 4,
        maxLength: 2000
    }
});

module.exports = mongoose.model("Post", postSchema);