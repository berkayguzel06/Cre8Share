const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { CommentReport } = require('../models'); // Importing the 'comment report' model from the '../models' directory

// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all comment reports from the database
    const listofCommentReports = await CommentReport.findAll();
    // Sending the list of users as a JSON response
    res.json(listofCommentReports);
});

// Handling HTTP POST requests to the root path ("/")
router.post("/", async (req, res) => {
    const post = req.body; // Extracting the request body, which should contain data for creating a new user
    await CommentReport.create(post); // Using Sequelize's 'create' method to add a new comment report to the database
    res.send(post); // Sending the comment report data as a response
});

module.exports = router;