const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');

// Handling HTTP GET requests to the "/commentcount" path for a specific post
router.get("/commentcount", async (req, res) => {
    const { postID } = req.body;

    try {
        // Using Sequelize's 'count' method to retrieve the count of comments for a specific post
        const commentCount = await Comment.count({ where: { PostID: postID } });
        // Sending the comment count as a JSON response
        res.json({ postID, commentCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/:postID", async (req, res) => {
    const postID = req.params.postID; // Extracting the post ID from the URL parameters
    try {
        const listOfComments = await Comment.findAll({ where: { PostID: postID },
            include: {
                model: User,
                attributes: ['username'], // Include only the 'username' attribute of the User model
             }});
      if (listOfComments) {
        res.json(listOfComments);
      } else {
        console.log("Comments not found with ID:", postID);
        // If the post with the given ID is not found, send a 404 status
        res.status(404).json({ error: 'Comments are not found' });
      }
    } catch (error) {
      console.error('Error fetching comments :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// Handling HTTP POST requests to the "/delete" path
router.delete("/:commentID", async (req, res) => {
    const { commentID } = req.body;
    await Comment.destroy({ where: { id: commentID } });
    res.send(`Comment with ID ${commentID} deleted successfully`);
});

// Handling HTTP POST requests to the "/create" path
router.post("/create", async (req, res) => {
  console.log('Request Body:', req.body);
  const { content, userID, postID } = req.body;
  console.log('UserID:', userID); // Add this line to check the value of userID
    try {
        const newComment = await Comment.create({ content: content, UserId: userID, PostId: postID });  
        res.status(201).json({ newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
