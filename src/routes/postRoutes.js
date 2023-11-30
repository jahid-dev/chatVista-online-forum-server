// routes/postsRoutes.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
const verifyToken = require('../middlewares/verifyToken')

// Define routes
router.post('/posts', postsController.createPost);
router.get('/posts', postsController.getAllPosts);
router.get('/posts/:id', postsController.getPostById);

router.post('/comments', postsController.commentController);
router.get('/comments/:postId',postsController.getCommentController)
router.patch('/posts/update/:id',postsController.updatePostController)


router.get('/posts/myposts/:email',verifyToken, postsController.getMyProfileController);
router.delete('/posts/myposts/delete/:id', verifyToken, postsController.deleteMyPost  );

router.get('/comments',postsController.getReportedComments);

module.exports = router;

