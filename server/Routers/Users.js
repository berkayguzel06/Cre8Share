const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { User } = require('../models'); // Importing the 'User' model from the '../models' directory

// Handling HTTP GET requests to the root path ("/")
router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all users from the database
    const listofUsers = await User.findAll();
    // Sending the list of users as a JSON response
    res.json(listofUsers);
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

module.exports = router;