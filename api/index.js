const express = require("express");
const app = express();
const config = require("../config");
const cors = require('cors');
const activitiesRouter = require("../routes/activitiesRoute");
const bodyParser = require("body-parser");
const auth = require('../middleware/auth')

const mongoose = require("mongoose");
// const userRouter = require("../routes/userRoute");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

if (config.isVercel) { 
    app.use (async (req,res,next) => {
    await mongoose.connect(config.mongoUri, config.mongoOptions)
      return next();
    });
};

app.use("/activities", activitiesRouter);
// app.use("/user",userRouter);

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

module.exports = app;