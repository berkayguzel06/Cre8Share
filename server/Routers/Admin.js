const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { Admin, Post, User, Comment } = require('../models'); // Importing the 'User' model from the '../models' directory
const {sign} = require("jsonwebtoken")

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { username: username, password: password } });
    // Check if user exists
    if (!admin) {
      return res.json({ error: 'Admin not found' });
    }
    const accessToken = sign({username:admin.username,id:admin.id},"adminsecretkey");
    // Send token
    res.json({ token: accessToken, username: username});
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/post", async (req, res) => {
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

router.get("/user", async (req, res) => {
  try {
      const listOfUsers = await User.findAll();
      res.json(listOfUsers);
  } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/comment", async (req, res) => {
  try {

      const listOfComments = await Comment.findAll({
          include: {
              model: User,
              attributes: ['username','id'], 
          },
      });
      res.json(listOfComments);
  } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/post/:postid", async (req, res) => {
  try {
      const post = await Post.findOne({where: {id: req.params.postid}});
      if (!post) {
        return res.json({ error: 'Post not found' });
      } else {
        await post.destroy();
        res.json({ message: 'Post deleted successfully' });
      }
  } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/comment/:commentid", async (req, res) => {
  try {
      const comment = await Comment.findOne({where: {id: req.params.commentid}});
      if (!comment) {
        return res.json({ error: 'Comment not found' });
      } else {
        await comment.destroy();
        res.json({ message: 'Comment deleted successfully' });
      }
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;