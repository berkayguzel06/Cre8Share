const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 587,
  auth: {
    user: 'cre8share.noreply@gmail.com',
    pass: 'dpoe nkef texv txcx',
  },
});

// Function to send password reset email
const sendResetPasswordEmail = (recipientEmail, resetLink) => {
  const mailOptions = {
    from: 'cre8share.noreply@gmail.com',
    to: recipientEmail,
    subject: 'Reset Password',
    text: `Click on the link to set your new password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendResetPasswordEmail };