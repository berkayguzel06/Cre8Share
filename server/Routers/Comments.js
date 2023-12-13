const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { Comment } = require('../models'); // Importing the 'Comment' model from the '../models' directory

// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all comments from the database
    const listofComment = await Comment.findAll();
    // Sending the list of users as a JSON response
    res.json(listofComments);
});

// Handling HTTP POST requests to the root path ("/")
router.post("/", async (req, res) => {
    const post = req.body; // Extracting the request body, which should contain data for creating a new user
    await Comment.create(post); // Using Sequelize's 'create' method to add a new comment to the database
    res.send(post); // Sending the comment data as a response
});

module.exports = router;