const express = require('express');
const db = require('./models'); // Importing the database models
const cors = require('cors'); // Importing the CORS middleware
const app = express(); // Creating an instance of the Express application
const PORT = process.env.PORT || 5000; // Port number for the server
const postRouter = require('./Routers/Posts'); // Importing the router for handling posts
const userRouter = require('./Routers/Users'); // Importing the router for handling users
const forgotpasswordRouter = require('./Routers/ForgotPassword');
const commentReportRouter = require('./Routers/CommentReports');
const commentRouter = require('./Routers/Comments');
const friendRouter = require('./Routers/Friends');
const likeRouter = require('./Routers/Likes');
const postReportRouter = require('./Routers/PostReports');
const imageGen = require('./Routers/ImageGen');
const getImageData = require('./Routers/GetImage');
const admin = require('./Routers/Admin');
const bodyParser = require('body-parser');

app.use(cors({
  origin: 'http://localhost:3000', // Allowed address 'http://localhost:3000'
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed http methods
  credentials: true,
  optionsSuccessStatus: 204,
}));



app.use(bodyParser.json());
app.use('/getimages', getImageData);
app.use("/post", postRouter); // Using the postRouter for requests starting with '/posts'
app.use("/user", userRouter); // Using the userRouter for requests starting with '/users'
app.use("/forgotpassword", forgotpasswordRouter);
app.use("/commentreport", commentReportRouter);
app.use("/comment", commentRouter);
app.use("/friend", friendRouter);
app.use("/like", likeRouter);
app.use("/postreport", postReportRouter);
app.use("/imagegen", imageGen);
app.use("/admin", admin);

db.sequelize.sync().then(() => {
  // Synchronizing the database models and starting the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});