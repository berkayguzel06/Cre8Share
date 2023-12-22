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
    const commentID = req.body; // Extracting the request body, which should contain data for creating a new user
    await CommentReport.create({ CommentID: commentID });
    res.send("Report count created successfully");
});
router.post("/update", async (req, res) => {
    const { commentID } = req.body; // Extracting the body if the user clicks on a button request, returning post id
    await CommentReport.update({ reportCount: sequelize.literal('reportCount + 1') },{ where: { CommentID: commentID } });
    res.send("Report count updated successfully");
});

module.exports = router;