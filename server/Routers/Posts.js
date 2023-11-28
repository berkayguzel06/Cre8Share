const express = require('express');
const router = express.Router();
const {User} = require('../models');

router.get("/", async (req, res) => { // gets all users from database
    const listofUsers = await User.findAll();
    res.json(listofUsers);
});

router.post("/", async (req, res) => { // creates a new user in database
    const post = req.body;
    await User.create(post);
    res.send(post);
});

module.exports = router;