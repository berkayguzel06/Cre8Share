const express = require('express');
const router = express.Router();
const { Like } = require('../models');

router.get("/likecount", async (req, res) => {
    const postId = req.query.postId;
    try {
        const likeCount = await Like.count({ where: { PostId: postId } });
        res.json({ likeCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Handling HTTP POST requests to the "/like" path
router.post("/like", async (req, res) => {
    try {
        const { PostId, userid } = req.body;
        const isExist = await Like.findOne({ where: { PostId: PostId, userid: userid } });
        if (isExist) {
            isExist.destroy();
            const likeCount = await Like.count();
            res.json({ likeCount });
            return;
        }
        await Like.create({ PostId: PostId, userid: userid });
        const likeCount = await Like.count();
        res.json({ likeCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
