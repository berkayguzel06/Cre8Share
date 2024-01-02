const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');

router.get("/commentcount", async (req, res) => {
    const { postID } = req.body;

    try {
        const commentCount = await Comment.count({ where: { PostID: postID } });
        res.json({ postID, commentCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/:postID", async (req, res) => {
    const postID = req.params.postID; // Get id
    try {
        const listOfComments = await Comment.findAll({ where: { PostID: postID },
            include: {
                model: User,
                attributes: ['id','username'],
             }});
      if (listOfComments) {
        res.json(listOfComments);
      } else {
        console.log("Comments not found with ID:", postID);
        res.status(404).json({ error: 'Comments are not found' });
      }
    } catch (error) {
      console.error('Error fetching comments :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.delete("/:commentID", async (req, res) => {
  const { commentID } = req.params; 
  try {
      await Comment.destroy({ where: { id: commentID } });
      res.send(`Comment with ID ${commentID} deleted successfully`);
  } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).send('Internal Server Error');
  }
});


router.post("/create", async (req, res) => {
  console.log('Request Body:', req.body);
  const { content, userID, postID } = req.body;
  console.log('UserID:', userID); 
    try {
        const newComment = await Comment.create({ content: content, UserId: userID, PostId: postID });  
        res.status(201).json({ newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
