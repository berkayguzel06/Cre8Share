const express = require('express');
const db = require('./models'); // Importing the database models
const cors = require('cors'); // Importing the CORS middleware
const app = express(); // Creating an instance of the Express application
const PORT = process.env.PORT || 5000; // Setting the port for the server
const postRouter = require('./Routers/Posts'); // Importing the router for handling posts
const userRouter = require('./Routers/Users'); // Importing the router for handling users
const forgotpasswordRouter = require('./Routers/ForgotPassword'); // Importing the router for handling users
const commentReportRouter = require('./Routers/CommentReports'); // Importing the router for handling users
const commentRouter = require('./Routers/Comments'); // Importing the router for handling users
const friendRouter = require('./Routers/Friends'); // Importing the router for handling users
const likeRouter = require('./Routers/Likes'); // Importing the router for handling users
const postReportRouter = require('./Routers/PostReports'); // Importing the router for handling users
const bodyParser = require('body-parser');

// Enable CORS with a custom configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allowing requests from 'http://localhost:3000'
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowing specified HTTP methods
  credentials: true, // Allowing credentials (e.g., cookies, authorization headers)
  optionsSuccessStatus: 204, // Setting the HTTP status code for preflight requests
}));

app.use(bodyParser.json());
app.use("/post", postRouter); // Using the postRouter for requests starting with '/posts'
app.use("/forgotpassword", forgotpasswordRouter); // Using the postRouter for requests starting with '/posts'
app.use("/user", userRouter); // Using the userRouter for requests starting with '/users'
app.use("/commentreport", commentReportRouter); // Using the userRouter for requests starting with '/users'
app.use("/comment", commentRouter); // Using the userRouter for requests starting with '/users'
app.use("/friend", friendRouter); // Using the userRouter for requests starting with '/users'
app.use("/like", likeRouter); // Using the userRouter for requests starting with '/users'
app.use("/postreport", postReportRouter); // Using the userRouter for requests starting with '/users'

db.sequelize.sync().then(() => {
  // Synchronizing the database models and starting the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// End of the server setup