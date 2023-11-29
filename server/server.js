const express = require('express');
const db = require('./models') // gets db model from models folder
const cors = require('cors'); // allows cross origin resource sharing

const app = express();
const PORT = process.env.PORT || 5000;
const postRouter = require('./Routers/Posts'); // gets posts router from router folder
// Enable CORS with a custom configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use("/posts", postRouter);

db.sequelize.sync().then(() => { // when api is ready check model folder and sync the database every table
  app.listen(PORT, () => {        // starts the server
    console.log(`Server is running on port ${PORT}`);
  });
});

