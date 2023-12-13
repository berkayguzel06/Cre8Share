const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { Post } = require('../models'); // Importing the 'postreport' model from the '../models' directory

// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all postreports from the database
    const listofPostReports = await PostReport.findAll();
    // Sending the list of users as a JSON response
    res.json(listofPostReports);
});

// Handling HTTP POST requests to the root path ("/")
router.post("/", async (req, res) => {
    const post = req.body; // Extracting the request body, which should contain data for creating a new user
    await PostReport.create(post); // Using Sequelize's 'create' method to add a postreport to the database
    res.send(post); // Sending the created postreport data as a response
});

module.exports = router;