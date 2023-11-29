// routes/postsRoutes.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');

// Define routes
router.post('/posts', postsController.createPost);
router.get('/posts', postsController.getAllPosts);
router.get('/posts/:id', postsController.getPostById);
router.post('/comments/:postId', postsController.postComment);
router.post('/upvote/:postId', postsController.upvotePost);
router.post('/downvote/:postId', postsController.downvotePost);
module.exports = router;
