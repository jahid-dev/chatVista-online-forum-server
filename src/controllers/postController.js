const mongoose = require('mongoose');
  // commentsController.js
  const Comments = require('../models/Comment');
// controllers/postsController.js
const Posts = require('../models/Post');
const { ObjectId } = mongoose.Types;

exports.createPost = async (req, res) => {
    try {
        const postData = req.body;
        const newPost = await Posts.create(postData);
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getPostById = async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await Posts.findById({_id:postId});
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


// Controller to post a new comment
exports.postComment = async (req, res) => {
    try {
        const { postId, commentText, commenter, commenterImg, commenterEmail, commentTime } = req.body;

        const newComment = new Comments({
            postId,
            commentText,
            commenter,
            commenterImg,
            commenterEmail,
            commentTime,
        });

        await newComment.save();

        // Update comment count in the corresponding post using aggregation pipeline
        const updateResult = await Posts.updateOne(
            { _id: ObjectId(postId) },
            [
                {
                    $set: {
                        commentsCount: { $add: ['$commentsCount', 1] },
                    },
                },
            ]
        );

        if (updateResult.modifiedCount === 0) {
            console.error('Post not found');
        }

        res.status(201).json({ message: 'Comment posted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.upvotePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Posts.findById(postId);
        if (post) {
            post.upVote += 1;
            await post.save();
            res.status(200).json({ message: 'Post upvoted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to downvote a post
exports.downvotePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Posts.findById(postId);
        if (post) {
            post.downVote += 1;
            await post.save();
            res.status(200).json({ message: 'Post downvoted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

