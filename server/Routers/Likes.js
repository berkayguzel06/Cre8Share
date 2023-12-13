const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { Like } = require('../models'); // Importing the 'Likes' model from the '../models' directory

// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all likes from the database
    const listofLikes = await Like.findAll();
    // Sending the list of users as a JSON response
    res.json(listofLikes);
});

// Handling HTTP POST requests to the root path ("/")
router.post("/", async (req, res) => {
    const post = req.body; // Extracting the request body, which should contain data for creating a new user
    await Like.create(post); // Using Sequelize's 'create' method to add a new like to the database
    res.send(post); // Sending the like data as a response
});

module.exports = router;