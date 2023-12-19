const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { Post } = require('../models'); // Importing the 'User' model from the '../models' directory

// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all users from the database
    const listofPosts = await Post.findAll();
    // Sending the list of users as a JSON response
    res.json(listofPosts);
});

// Handling HTTP POST requests to the root path ("/")
router.post("/", async (req, res) => {
    const post = req.body; // Extracting the request body, which should contain data for creating a new user
    await Post.create(post); // Using Sequelize's 'create' method to add a new user to the database
    res.send(post); // Sending the created user data as a response
});



module.exports = router;