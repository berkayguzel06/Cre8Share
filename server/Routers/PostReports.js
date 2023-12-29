const express = require('express');
const router = express.Router();
const { PostReport } = require('../models');

router.get("/reportcount", async (req, res) => {
    const postId = req.query.postId;
    try {
        const reportCount = await PostReport.count({ where: { PostId: postId } });
        res.json({ reportCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Handling HTTP POST requests to the "/report" path
router.post("/report", async (req, res) => {
    try {
        const { PostId, userid } = req.body;
        console.log(PostId);
        const isExist = await PostReport.findOne({ where: { PostId: PostId, userid: userid } });
        if (isExist) {
            isExist.destroy();
            const reportCount = await PostReport.count();
            res.json({ reportCount });
            return;
        }
        await PostReport.create({ PostId: PostId, userid: userid });
        const reportCount = await PostReport.count();
        res.json({ reportCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
