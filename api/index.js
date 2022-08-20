const express = require("express");
const app = express();
const config = require("../config");
const cors = require('cors');
const activitiesRouter = require("../routes/activitiesRoute");
const bodyParser = require("body-parser");


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


module.exports = app;