const express = require("express");
const app = express();
const config = require("./config");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const activitiesRouter = require("./routes/activitiesRoute");
app.use("/activities", activitiesRouter);

const start = async () => {
  // DO NOT COMMIT/PUSH USERNAME AND PASSWORD TO Github
  await mongoose.connect(config.mongodb.uri, {
    user: config.mongodb.username,
    pass: config.mongodb.password,
    retryWrites: true,
  });
  app.listen(9000, () => {
    console.log(`Server is listening on port 9000`);
  });
};

start();
