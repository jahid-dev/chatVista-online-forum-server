// controllers/postsController.js
const Posts = require('../models/Post');

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
