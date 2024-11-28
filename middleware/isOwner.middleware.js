const mongoose = require("mongoose");
const Event = require("../models/Event.model");

const isOwner = (req, res, next) => {
  const { eventId } = req.params;
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  Event.findById(eventId)
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (event.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      next();
    })
    .catch(error => {
      console.error("Error verifying ownership:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

module.exports = { isOwner };