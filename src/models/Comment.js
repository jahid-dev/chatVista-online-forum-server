const { Schema, model } = require('mongoose');

const CommentsSchema = new Schema({
    postId: {
        type: String,
        required: true,
    },
    commentText: {
        type: String,
        required: true,
    },
    commenter: {
        type: String,
        required: true,
    },
    commenterImg: {
        type: String,
    },
    commenterEmail: {
        type: String,
    },
    commentTime: {
        type: String,
    },
});

const Comments = model('Comments', CommentsSchema);

module.exports = Comments;
