const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { User, Friend, Comment, Post } = require('../models'); // Importing the 'User' model from the '../models' directory
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/UserAuth")
const { Op } = require('sequelize');
// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all users from the database
    const listofUsers = await User.findAll();
    // Sending the list of users as a JSON response
    res.json(listofUsers);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    await user.destroy();
    return res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Handling HTTP POST requests to the "/login" path
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Using Sequelize's 'findOne' method to retrieve a user from the database based on email
    const user = await User.findOne({ where: { email: email } });

    // Check if user exists
    if (!user) {
      return res.json({ error: 'User not found' });
    }

    // Check if the provided password matches the user's password
    if (user.password && password !== user.password) {
      return res.json({ error: 'Wrong email or password' });
    }
    // Create a token for the user
    // Create a token for the user
    const accessToken = sign({email:user.email,id:user.id},"importantsecret");
    // If everything is fine, send a token to the client
    res.json({ token: accessToken, email: email, id: user.id, username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/searchedusers/:input", async (req, res) => {
  console.log('Route accessed!');
  const { input } = req.params;
  console.log('Input:', input);
  try {
    if (!input) {
      return res.json({ error: 'Input is required.' });
    }

    const ListOfUsers = await User.findAll({
      where: { username: { [Op.like]: `%${input}%` } },
    });

    if (!ListOfUsers || ListOfUsers.length === 0) {
      return res.json({ error: 'No Matching User' });
    }
    console.log('ListOfUsers:', ListOfUsers);
    return res.json({ ListOfUsers });
  } catch (error) {
    console.error('Error during user search:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/usernamewithid", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({ where: { id:id } });
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    return res.json({ username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updatepfp/:id', async (req, res) => {
  console.log("GELDİM LAN");
  const { id } = req.params;
  const { profilePicture } = req.body;
  try {
    const user = await User.findOne({where: { id: id }});
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    const binaryContent = Buffer.from(String(profilePicture), 'base64');
    user.pfp = binaryContent;
    await user.save();
    return res.json({ message: 'Profile picture updated successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/updatebanner/:id', async (req, res) => {
  console.log("GELDİM LAN2");
  const { id } = req.params;
  const { bannerPicture } = req.body;
  try {
    const user = await User.findOne({where: { id: id }});
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    const binaryContent = Buffer.from(String(bannerPicture), 'base64');
    user.banner = binaryContent;
    await user.save();
    return res.json({ message: 'Banner updated successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({where: { username: username }});
    if (user) {
      res.json(user);
    } else {
      console.log("User not found with username:", username);
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/profile/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({where: { username: username },
      include: [
        { model: Post },
        { model: Comment },
      ]
    });
    if (user) {
      res.json(user);
    } else {
      console.log("User not found with username:", username);
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update your user router
router.post("/", async (req, res) => {
    try {
      const userData = req.body; // Extracting the request body, which contains user data
      console.log('Created user:', userData);
      const newUser = await User.create(userData); // Using Sequelize's 'create' method to add a new user to the database
      // Print the created user data to the console
      res.status(201).json(newUser); // Sending the created user data as a response
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});





module.exports = router;