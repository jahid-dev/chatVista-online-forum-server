// routes/postsRoutes.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');

// Define routes
router.post('/posts', postsController.createPost);
router.get('/posts', postsController.getAllPosts);

module.exports = router;
