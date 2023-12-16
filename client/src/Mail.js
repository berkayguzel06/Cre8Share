var nodemailer = require('nodemailer');
//const usermail = 
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 587,
  auth: {
    user: 'cre8share.noreply@gmail.com',
    pass: 'dpoe nkef texv txcx'
  }
});

var mailOptions = {
  from: 'cre8share.noreply@gmail.com',
  to: 'berkayguzel43@gmail.com',
  subject: 'Reset Password',
  text: 'Click on the link to set your new password!  '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
