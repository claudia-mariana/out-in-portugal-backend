const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    activity: {
      type: mongoose.schema.Types.objectId,
      ref: "Activity",
      required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
      },
    endDate: Date,
    Organization: {
        type: String,
    },
    price: Number,
  });
  
  const Event = mongoose.model("Event", eventSchema);

  module.exports = Event;