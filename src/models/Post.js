const { Schema, model} = require('mongoose');

const PostsSchema = new Schema({
    authorName : {
        type: String,
    },
    authorEmail : {
        type: String,
        required: true,
    },
    authorImg : {
        type: String,
    },
    postTitle: {
        type: String
    },
    postTime: {
        type: String
    },
    postImg: {
        type: String
    },
    postDescription: {
        type: String
    },
    tag: {
        type: String
    },
    upVote: {
        type: Number
    },
    downVote: {
        type: Number
    },
    share: {
        type: Number
    }
});

const Posts = model('Posts', PostsSchema);

module.exports = Posts;
