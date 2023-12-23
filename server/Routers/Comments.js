const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

// Handling HTTP GET requests to the "/commentcount" path for a specific post
router.get("/commentcount", async (req, res) => {
    const { postID } = req.body;

    try {
        // Using Sequelize's 'count' method to retrieve the count of comments for a specific post
        const commentCount = await Comment.count({ where: { PostID: postID } });
        // Sending the comment count as a JSON response
        res.json({ postID, commentCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Handling HTTP POST requests to the "/delete" path
router.delete("/", async (req, res) => {
    const { commentID } = req.body;
    await Comment.destroy({ where: { id: commentID } });
    res.send(`Comment with ID ${commentID} deleted successfully`);
});

// Handling HTTP POST requests to the "/create" path
router.post("/create", async (req, res) => {
    try {
        const { postID, userID, content } = req.body;
        const newComment = await Comment.create({ PostID: postID, userid: userID, content:content });
        res.json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
