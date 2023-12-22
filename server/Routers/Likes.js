const express = require('express');
const router = express.Router();
const { Like } = require('../models');

router.get("/likecount", async (req, res) => {
    try {
        const postID = req.body.postID;
        const likeCount = await Like.count({ where: { PostID: postID } });
        res.json({ likeCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Handling HTTP POST requests to the "/like" path
router.post("/like", async (req, res) => {
    try {
        const { postID, userID } = req.body;
        await Like.create({ PostID: postID, UserID: userID });
        const likeCount = await Like.count();
        res.json({ likeCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Handling HTTP POST requests to the "/dislike" path
router.post("/dislike", async (req, res) => {
    try {
        const { postID, userID } = req.body;
        // Delete dislike entry
        await Like.destroy({ where: { PostID: postID, UserID: userID } });
        // Recalculate like count
        const likeCount = await Like.count();
        res.json({ likeCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
