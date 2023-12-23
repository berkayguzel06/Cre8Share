const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { Post, User } = require('../models'); // Importing the 'User' model from the '../models' directory
const {validateToken} = require("../middlewares/UserAuth")

// (validation) validateToken is a middleware that checks if the user is logged in then return posts
router.get("/", validateToken, async (req, res) => {
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

// Handling HTTP POST requests to the root path ("/")
router.post("/", async (req, res) => {
    const post = req.body; // Extracting the request body, which should contain data for creating a new user
    await Post.create(post); // Using Sequelize's 'create' method to add a new user to the database
    res.send(post); // Sending the created user data as a response
});

router.delete("/:postID", async (req, res) => {
    const { postID } = req.body;
    const post = req.body; // Extracting the request body, which should contain data for creating a new user
    await Post.destroy({ where: { id: postID } });
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