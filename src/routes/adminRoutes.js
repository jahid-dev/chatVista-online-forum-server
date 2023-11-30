const express = require('express');
const User = require('../models/User');
const Posts = require('../models/Post');
const Comments = require('../models/Comment');

const adminStatsRoute = express.Router();

adminStatsRoute.get('/admin-stats', async(req, res) => {
    const users = await User.estimatedDocumentCount()
    const posts = await Posts.estimatedDocumentCount();
    const comments = await Comments.estimatedDocumentCount();

    res.send({ 
        users,
        posts,
        comments
          });
  });


  module.exports = adminStatsRoute;