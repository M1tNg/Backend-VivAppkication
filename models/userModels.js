const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "please provide username"],
      unique: [true, "username is exist"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      unique: false,
    },
    activities: {
      ActType: {
        enum: ["Walking", "Running", "Hiking", "Swimming", "Riding bicycle"],
        type: String,
        require: true,
      },
      hour: {
        type: Number,
        require: true,
      },
      minute: {
        type: Number,
        require: true,
      },
      date: {
        type: Date,
        require: true,
      },
      description: {
        type: String,
        max: 100,
      },
    },
    schedule: {
      title: { type: String, min: 5, max: 200, required: true },
      start: { type: Date, required: true },
      end: { type: Date, required: true },
      allDay: { default: true, type: Boolean },
    },
  },
  {
    versionKey: false,
  }
);

const userModels = mongoose.model("user", userSchema);

module.exports = userModels;
