const express = require('express');
const router = express.Router();
const { sendResetPasswordEmail } = require('../middlewares/Mail');
const { User } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { email, username } = req.body;
    
    const user = await User.findOne({ where: { email: email, username: username } })
    if (!user) {
      return res.json({ message: 'User not found.' });
    }else{
      res.json({ message: 'We send e-mail your password reset link .' });
      // Send reset password email to user
      const resetLink = `http://localhost:3000/resetpassword?username=${encodeURIComponent(username)}`;
      sendResetPasswordEmail(email, resetLink);
    }
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/reset', async (req, res) => {
  try {

    const { password, username } = req.body; // Get data
    
    const user = await User.findOne({ where: { username: username } })
    if (!user) {
      return res.json({ message: 'User not found.' });
    }else{
      user.update({ password: password });
      res.json({ message: 'Password Updated.' });
    }
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;