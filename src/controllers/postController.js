const mongoose = require('mongoose');
  // commentsController.js
  const Comments = require('../models/Comment');
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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const searchTag = req.query.tag || false;
  try {

    let totalPosts = await Posts.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;


    const filter = { tag: searchTag };
    const searchResult = await Posts.find(filter);
    // console.log(searchResult);
    const aggregationPipeline = [
          {
              $sort: { postTime: -1 }
          },
    
          {
            $skip: startIndex,
          },
          {
            $limit: limit,
          },

    ]
    let posts = await Posts.aggregate(aggregationPipeline);
    if (searchTag) {
      posts = searchResult;
      totalPosts = posts.length;
    }

    const pagination = {};
    if (endIndex < totalPosts) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    const forPopular = [
      {
        $addFields: {
          voteDifference: { $subtract: ["$upVote", "$downVote"] }
        }
      },
      {
        $sort: { voteDifference: -1 }
      },
      {
        $skip: startIndex,
      },
      {
        $limit: limit,
      },
    ];

    const popularPosts = await Posts.aggregate(forPopular);
    res.send({ posts, popularPosts, pagination, totalPosts });

  } catch (error) {
    console.error('Error getting posts data:', error);
    res.status(500).json({ message: 'Internal server error' });
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

  exports.updatePostController = async(req, res) => {
    try{
       const item = req.body;
       const id = req.params.id;
       const filter = { _id: new mongoose.Types.ObjectId(id) } 
       const updateDoc = {
        $set: {
          upVote: item?.upVote,
          downVote: item?.downVote,
        }
      }
      const result  = await Posts.updateOne(filter, updateDoc);
      res.send(result);
    }  catch (error) {
        console.error('Error update post data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// comment

exports.commentController = async(req, res) => {
  try{
      const comment = req.body;
      const newcomment  = new Comments(comment);
      const result = await newcomment.save();
      res.status(200).json(result);
  }catch (error) {
      console.error('Error post comment data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}
exports.getCommentController = async(req, res) => {

  try{
      const postId = req.params.postId;
      const filter = { postId: postId };
      const comments  = await Comments.find(filter);
      res.send(comments);
  } catch (error) {
      console.error('Error post comment data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

exports.updateCommentController = async (req, res) => {
  try {
      const report = req.body;
   
      const id = req.params.id;
      const query = { _id: new mongoose.Types.ObjectId(id) }
      
      const updateDoc = {
          $set: {
              feedback: report.feedback
          }
      }
      const result = await Comments.updateOne(query, updateDoc);
  
      res.send(result)

  } catch (error) {
      console.error('Error update comment data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getReportedComments = async(req, res) =>{
  try{
      const filter = { feedback: { $exists: true, $ne: null } };
      const reportedComments = await Comments.find(filter);

      const postIds = reportedComments.map(res => res.postId);
      const reportedPosts = await Posts.find({ _id: { $in: postIds } }).populate('authorName');


      const comments = reportedComments.map(comment => {
          const correspondingPost = reportedPosts.find(post => post._id.toString() === comment.postId);
          return {
              ...comment.toObject(),
              reportedBy: correspondingPost ? correspondingPost.authorName : 'Unknown'
          };
      });

      res.send(comments)
  } catch (error) {
      console.error('Error fetching reported comments:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}
  

  //my profile

 

exports.getMyProfileController = async(req, res) => {
    try{
        const email = req.params.email;

        const aggregationPipeline = [
            {
                $match: { authorEmail: email }
            },
            {
                $sort: {postTime: -1}
            }
        ];
       
        const result = await Posts.aggregate(aggregationPipeline);
       
        res.send(result);

    } catch (error) {
        console.error('Error getting posts data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// my post

exports.deleteMyPost  = async(req, res) => {
  try{
    const id = req.params.id;
    const deletePost = await Posts.findByIdAndDelete(id);
    res.send(deletePost);
  } catch (error) {
      console.error('Error delete post data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};





