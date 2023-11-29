// posts.js
const { Schema, model } = require('mongoose');

const PostsSchema = new Schema({
    authorName: {
        type: String,
    },
    authorEmail: {
        type: String,
        required: true,
    },
    authorImg: {
      type: String, 
  },
    postTitle: {
        type: String,
    },
    postTime: {
        type: String,
    },
    postImg: {
        type: String,
    },
    postDescription: {
        type: String,
    },
    tag: {
        type: [String],
    },
    upVote: {
        type: Number,
        default: 0,
    },
    downVote: {
        type: Number,
        default: 0,
    },
    share: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Posts = model('Posts', PostsSchema);

module.exports = Posts;
