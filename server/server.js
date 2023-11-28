const express = require('express');
const db = require('./models') // gets db model from models folder

const app = express();
const PORT = process.env.PORT || 5000;


db.sequelize.sync().then(() => { // when api is ready check model folder and sync the database every table
  app.listen(PORT, () => {        // starts the server
    console.log(`Server is running on port ${PORT}`);
  });
});



