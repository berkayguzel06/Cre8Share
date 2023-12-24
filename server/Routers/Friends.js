const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { Friend } = require('../models'); // Importing the 'friend' model from the '../models' directory

// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all friends from the database
    const listofFriends = await Friend.findAll();
    // Sending the list of users as a JSON response
    res.json(listofFriends);
});

// Handling HTTP POST requests to the root path ("/")
router.post("/", async (req, res) => {
    console.log(req.body);
    const {friendID, userid, status} = req.body; // Extracting the request body, which should contain data for creating a new user
    await Friend.create({UserId:userid, status:status, friendID:friendID}); // Using Sequelize's 'create' method to add a new friend to the database
    res.send("Succesfully Send"); // Sending the friend data as a response
});

// Handling HTTP POST requests to the root path ("/")
router.post("/update", async (req, res) => {
    const { status, userID } = req.body; // Extracting the body if the user clicks on a button request, returning post id
    await Friend.update({ status: status },{ where: { UserID: userID } });
    res.send("Friendship updated successfully");
});

module.exports = router;