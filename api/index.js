const express = require("express");
const app = express();
const config = require("../config");
const cors = require('cors');
const activitiesRouter = require("../routes/activitiesRoute");
const bodyParser = require("body-parser");
const scheduleRouter = require("../routes/scheduleRoute");
const morgan = require("morgan");


const mongoose = require("mongoose");
// const userRouter = require("../routes/userRoute");

app.use(morgan("dev"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
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
app.use("/schedule", scheduleRouter);
app.use('/users', require('../routes/userRoute'));


module.exports = app;