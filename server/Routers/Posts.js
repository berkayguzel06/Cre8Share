const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const {validateToken} = require("../middlewares/UserAuth");
s
router.get("/", validateToken, async (req, res) => {
    try {
        const listOfPosts = await Post.findAll({
            include: {
                model: User,
                attributes: ['username','id'],
            },
        });
        res.json(listOfPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/guestpage", async (req, res) => {
    try {
        const listOfPosts = await Post.findAll({
            include: {
                model: User,
                attributes: ['username'],
            },
        });
        res.json(listOfPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/:postID", async (req, res) => {
    const postID = req.params.postID;
    try {
      const post = await Post.findOne({
        where: { id: postID },
        include: {
          model: User,
          attributes: ['username', 'id'],
        },
      });
  
      if (post) {
        res.json(post);
      } else {
        console.log("Post not found with ID:", postID);
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

router.delete("/:postID", async (req, res) => {
  const { postID } = req.params;
  try {
      await Post.destroy({ where: { id: postID } });
      res.send(`Comment with ID ${postID} deleted successfully`);
  } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.post('/createpost', async (req, res) => {
    const { title, content, userid } = req.body;
    try {
      const binaryContent = Buffer.from(String(content), 'base64');
      const post = await Post.create({ title, content: binaryContent, UserId: userid });
  
      res.status(201).json({ post });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;