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
    console.log(uniqueFriendIDs);
    // Fetch usernames based on unique friend IDs
    const friendUsernames = await User.findAll({
        where: {
            id: Array.from(uniqueFriendIDs)
        },
        attributes: ['id', 'username'] // Adjust attributes as needed
    });
    console.log(friendUsernames);
    
    res.json(friendUsernames);
});

router.get("/profile/:userid", async (req, res) => {
    const userID = req.params.userid;
    const listofFriends = await Friend.findAll({
        where: {
            [Op.or]: [
                { UserId: userID },
                { friendID: userID }
            ]
        }
    });

    // Use a Set to store unique friend IDs
    const uniqueFriendIDs = new Set();

    // Use a Map to store friend data (key: friendID, value: friend object)
    const uniqueFriendsMap = new Map();

    listofFriends.forEach(friend => {
        const friendID = friend.UserId === userID ? friend.friendID : friend.UserId;

        // Check if friendID is not in the set (not a duplicate)
        if (!uniqueFriendIDs.has(friendID)) {
            uniqueFriendIDs.add(friendID);
            uniqueFriendsMap.set(friendID, {
                id: friendID,
                status: friend.status
            });
        }
    });

    // Convert the Map values to an array
    const uniqueFriendData = Array.from(uniqueFriendsMap.values());
    
    res.json(uniqueFriendData);
});

// Handling HTTP GET requests to the root path ("/")
router.get("/:userID", async (req, res) => {
    const userID = req.params.userID; // Extracting the post ID from the URL parameters
    console.log(userID);
    // Using Sequelize's 'findAll' method to retrieve all friends from the database
    const user = await Friend.findOne({ where: { UserId: userID }});
    const friend = await Friend.findOne({ where: { friendID: userID }});
    if(user!=null){
        res.json(user);
        console.log("user: ",user);
    }else if(friend!=null){
        console.log("friend: ",friend);
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