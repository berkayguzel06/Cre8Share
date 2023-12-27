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

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let friend = await Friend.findOne({ where: { id: id } });
      if (!friend) {
        friend = await Friend.findOne({ where: { friendID: id } });
        if(!friend){
            return res.json({ error: 'Friend not found' });
        }
      }
      await friend.destroy();
      return res.json({ message: 'Friend deleted' });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
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
    console.log(req.body);
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