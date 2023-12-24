const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { User } = require('../models'); // Importing the 'User' model from the '../models' directory
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/UserAuth")

// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all users from the database
    const listofUsers = await User.findAll();
    // Sending the list of users as a JSON response
    res.json(listofUsers);
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
    res.json({ token: accessToken, email: email, id: user.id });
  } catch (error) {
    console.error('Error during login:', error);
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