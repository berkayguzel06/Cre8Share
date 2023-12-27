const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { User, Friend } = require('../models'); // Importing the 'friend' model from the '../models' directory
const { Op } = require('sequelize');
// Handling HTTP GET requests to the root path ("/")
router.get("/profile/username/:userid", async (req, res) => {
    const userID = req.params.userid; // Extracting the post ID from the URL parameters
    const listofFriends = await Friend.findAll({
        where: {
            [Op.or]: [
                { UserId: userID },
                { friendID: userID }
            ]
        }
    });
    const uniqueFriendIDs = new Set();
    listofFriends.forEach(friend => {
        uniqueFriendIDs.add(friend.UserId);
        uniqueFriendIDs.add(friend.friendID);
    });
    // Fetch usernames based on unique friend IDs
    const friendUsernames = await User.findAll({
        where: {
            id: Array.from(uniqueFriendIDs)
        },
        attributes: ['id', 'username'] // Adjust attributes as needed
    });
    res.json(friendUsernames);
});

// Handling HTTP GET requests to the root path ("/")
router.get("/:userID", async (req, res) => {
    const friendship = req.query; // Change this line to retrieve the object from the request body
    // Using Sequelize's 'findAll' method to retrieve all friends from the database
    const user = await Friend.findOne({ where: { UserId: friendship.userid, friendID: friendship.friendID }});
    const friend = await Friend.findOne({ where: { UserId: friendship.friendID, friendID: friendship.userid }});
    if(user!=null){
        res.json(user);
    }else if(friend!=null){
        res.json(friend);
    }else{
        res.json(user);
    }
});

router.delete("/", async (req, res) => {
    const { userid, friendID } = req.body;
    console.log(userid, friendID);

    try {
        // Assuming Friend is your Sequelize model
        const friend = await Friend.findOne(
            { where: { UserId: userid, friendID: friendID } }
        );
        console.log(friend);
        if (friend) {
            await friend.destroy();
            res.send("Friendship declined.");
        } else {
            res.status(404).send("Friendship not found.");
        }
    } catch (error) {
        console.error("Error deleting friendship:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Handling HTTP POST requests to the root path ("/")
router.post("/", async (req, res) => {
    const {friendID, userid, status} = req.body; // Extracting the request body, which should contain data for creating a new user
    await Friend.create({UserId:userid, status:status, friendID:friendID}); // Using Sequelize's 'create' method to add a new friend to the database
    res.send("Succesfully Send"); // Sending the friend data as a response
});

// Handling HTTP POST requests to the root path ("/")
router.post("/update", async (req, res) => {
    const { userid, friendID, status } = req.body;
    try {
        // Assuming Friend is your Sequelize model
        const updatedRows = await Friend.update(
            { status: status },
            { where: { UserId: userid, friendID: friendID } }
        );

        console.log(`Updated ${updatedRows[0]} rows`);

        res.send("Friendship updated successfully");
    } catch (error) {
        console.error("Error updating friendship:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;