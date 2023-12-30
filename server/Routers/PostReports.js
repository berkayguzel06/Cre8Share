const express = require('express');
const router = express.Router();
const { PostReport, Post } = require('../models');

// Handling HTTP POST requests to the "/report" path
router.post("/report", async (req, res) => {
    try {
        const { PostId, userid } = req.body;
        console.log(PostId);
        const isExist = await PostReport.findOne({ where: { PostId: PostId, userid: userid } });
        const post = await Post.findOne({ where: { id: PostId } });
        if (isExist) {
            isExist.destroy();
            post.update({ report: post.report - 1 });
            res.json("Unreported");
            return;
        }
        await PostReport.create({ PostId: PostId, userid: userid });
        post.update({ report: post.report + 1 });
        res.json("Reported");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
