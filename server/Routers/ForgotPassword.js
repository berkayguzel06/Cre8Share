const express = require('express'); // Importing the 'express' library to create a router 
const router = express.Router(); // Creating an instance of an Express router
const { sendResetPasswordEmail } = require('../Mail');


  router.post('/', (req, res) => {
    try {
      // Access the data sent from the client using req.body
      const { email, username } = req.body;
  
      // Generate a unique reset link, you may use a token or a unique identifier
      const resetLink = 'http://localhost:3000/resetpassword';
  
      // Send the reset password email
      sendResetPasswordEmail(email, resetLink);
  
      // Respond to the client, e.g., send a success message
      res.json({ message: 'Forgot password request received successfully.' });
    } catch (error) {
      console.error('Internal Server Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.get("/", async (req, res) => {
    // Using Sequelize's 'findAll' method to retrieve all comments from the database
    // Sending the list of users as a JSON response
    res.json(req.body);
});


module.exports = router;