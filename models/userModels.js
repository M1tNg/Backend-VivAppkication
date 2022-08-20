const mongoose = require("mongoose");

const activitiesSchema = mongoose.Schema(
  {
    activities: 
      {
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

const activitiesModels = mongoose.model("activities", activitiesSchema);

module.exports = activitiesModels;
