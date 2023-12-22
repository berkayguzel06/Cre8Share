const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { PostReport } = require('../models'); // Importing the 'postreport' model from the '../models' directory

// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all postreports from the database
    const listofPostReports = await PostReport.findAll();
    // Sending the list of users as a JSON response
    res.json(listofPostReports);
});
// Handling HTTP POST requests to the root path ("/")
router.post("/", async (req, res) => {
    const postID = req.body; // Extracting the request body, which should contain data for creating a new user
    await Post.create({ PostID: postID });
    res.send("Report count created successfully");
});
// Handling HTTP POST requests to the root path ("/")
router.post("/update", async (req, res) => {
    const { postID } = req.body; // Extracting the body if the user clicks on a button request, returning post id
    await PostReport.update({ reportCount: sequelize.literal('reportCount + 1') },{ where: { PostID: postID } });
    res.send("Report count updated successfully");
});

module.exports = router;