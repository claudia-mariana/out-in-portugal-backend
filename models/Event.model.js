const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true,
      },
    endDate: Date,
    description: {
      type: String,
    },
    organization: {
        type: String,
    },
    meetingPoint: {
      type: String,
      required: true,
    },
    targetAudience: {
      type: String,
      enum: ['Children', 'Adults', 'Seniors', 'Everyone']
    },
    duration: {
      type: String,
    },
    equipment: {
      type: String,
    },
    price: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  });
  
  const Event = mongoose.model("Event", eventSchema);

  module.exports = Event;