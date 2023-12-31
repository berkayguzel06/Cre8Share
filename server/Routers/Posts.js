const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { Post, User } = require('../models'); // Importing the 'User' model from the '../models' directory
const {validateToken} = require("../middlewares/UserAuth");

// (validation) validateToken is a middleware that checks if the user is logged in then return posts
router.get("/", validateToken, async (req, res) => {
    try {
        // Using Sequelize's 'findAll' method to retrieve all posts from the database
        const listOfPosts = await Post.findAll({
            include: {
                model: User,
                attributes: ['username','id'], // Include only the 'username' attribute of the User model
            },
        });
        // Sending the list of posts as a JSON response
        res.json(listOfPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/guestpage", async (req, res) => {
    try {
        // Using Sequelize's 'findAll' method to retrieve all posts from the database
        const listOfPosts = await Post.findAll({
            include: {
                model: User,
                attributes: ['username'], // Include only the 'username' attribute of the User model
            },
        });
        // Sending the list of posts as a JSON response
        res.json(listOfPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handling HTTP GET requests to retrieve a specific post by ID
router.get("/:postID", async (req, res) => {
    const postID = req.params.postID; // Extracting the post ID from the URL parameters
    try {
      const post = await Post.findOne({
        where: { id: postID },
        include: {
          model: User,
          attributes: ['username', 'id'],
        },
      });
  
      if (post) {
        res.json(post);
      } else {
        console.log("Post not found with ID:", postID);
        // If the post with the given ID is not found, send a 404 status
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

router.delete("/:postID", async (req, res) => {
  const { postID } = req.params; // Use req.params to get parameters from the URL path
  try {
      await Post.destroy({ where: { id: postID } });
      res.send(`Comment with ID ${postID} deleted successfully`);
  } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.post('/createpost', async (req, res) => {
    const { title, content, userid } = req.body;
    try {
      // Decode base64 to binary
      const binaryContent = Buffer.from(String(content), 'base64');
      // Create the post in the database
      const post = await Post.create({ title, content: binaryContent, UserId: userid });
  
      res.status(201).json({ post });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;