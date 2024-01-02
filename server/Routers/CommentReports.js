const express = require('express'); 
const router = express.Router(); 
const { CommentReport } = require('../models');

router.get("/reportcount", async (req, res) => {
    const postId = req.query.postId;
    try {
        const reportCount = await CommentReport.count({ where: { PostId: postId } });
        res.json( reportCount );
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.post("/report", async (req, res) => {
    try {
        const { CommentId, userid } = req.body;
        console.log(CommentId);
        const isExist = await CommentReport.findOne({ where: { CommentId: CommentId, userid: userid } });
        if (isExist) {
            isExist.destroy();
            const reportCount = await CommentReport.count();
            res.json({ reportCount });
            return;
        }
        await CommentReport.create({ CommentId: CommentId, userid: userid });
        const reportCount = await CommentReport.count();
        res.json({ reportCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
