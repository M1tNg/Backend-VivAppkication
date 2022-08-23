const mongoose = require("mongoose");

const activitiesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
  {
    versionKey: false,
  }
);

const activitiesModels = mongoose.model("activities", activitiesSchema);

module.exports = activitiesModels;
