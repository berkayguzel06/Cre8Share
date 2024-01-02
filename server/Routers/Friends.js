const express = require('express');  
const router = express.Router(); 
const { User, Friend } = require('../models'); 
const { Op } = require('sequelize');
router.get("/profile/username/:userid", async (req, res) => {
    const userID = req.params.userid; 
    // Find all friends of the user
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
    const friendUsernames = await User.findAll({
        where: {
            id: Array.from(uniqueFriendIDs)
        },
        attributes: ['id', 'username','pfp','banner'] 
    });
    res.json(friendUsernames);
});

router.get("/:userID", async (req, res) => {
    const friendship = req.query; 
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
        let friend = await Friend.findOne(
            { where: { UserId: userid, friendID: friendID } }
        );
        if (!friend) {
            friend = await Friend.findOne(
                { where: { UserId: friendID, friendID: userid } }
            );
        }
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

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const friends = await Friend.findAll({ where: { friendID: id } });

        if (friends.length > 0) {
            for (const friend of friends) {
                // If user decline or detele firendship
                await friend.destroy();
            }
            res.status(200).send("Friendships deleted successfully");
        } else {
            res.status(404).send("Friendships not found");
        }
    } catch (error) {
        console.error("Error deleting friendships:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/", async (req, res) => {
    const {friendID, userid, status} = req.body; 
    // Create a new friend in the database
    await Friend.create({UserId:userid, status:status, friendID:friendID}); 
    res.send("Succesfully Send"); 
});

router.post("/update", async (req, res) => {
    const { userid, friendID, status } = req.body;
    try {
        // Update if user accept friendship
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