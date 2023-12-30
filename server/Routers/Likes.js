const express = require('express');
const router = express.Router();
const { Like, Post } = require('../models');

// Handling HTTP POST requests to the "/like" path
router.post("/like", async (req, res) => {
    try {
        const { PostId, userid } = req.body;
        const isExist = await Like.findOne({ where: { PostId: PostId, userid: userid } });
        const post = await Post.findOne({ where: { id: PostId } });
        if (isExist) {
            isExist.destroy();
            post.update({ like: post.like - 1 });
            res.json("Disliked");
            return;
        }
        await Like.create({ PostId: PostId, userid: userid });
        post.update({ like: post.like + 1 });
        res.json("Liked");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
