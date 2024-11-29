const mongoose = require('mongoose');
const router = require('express').Router();
const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isOwner } = require("../middleware/isOwner.middleware")


// EVENT ROUTES
// POST /events - Creates a new event
router.post("/events", isAuthenticated, (req, res, next) => {
    const newEvent = {
      ...req.body,
      createdBy: req.payload._id
    };
  
    Event.create(newEvent)
      .then((eventFromDB) => {
        res.status(201).json(eventFromDB);
      })
      .catch((error) => {
        console.log(`Error occurred: ${error.message}`);
        next(error);
      });
  });
  
// GET /api/events - Retrieves all the events
router.get("/events", (req, res, next) => {
    Event.find()
      .then((eventsFromDB) => {
        res.status(200).json(eventsFromDB);
      })
      .catch((error) => {
        console.log(`Error occurred: ${error.message}`);
        next(error);
      });
  });
  

  // GET /api/events/:eventId - Retrieves a specific event by id
  router.get("/events/:eventId", (req, res, next) => {
    const { eventId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified ID is not valid" });
        return;
    }

    Event.findById(eventId)
      .populate("activity")
      .then((eventsFromDB) => {
        res.status(200).json(eventsFromDB);
      })
      .catch((error) => {
        console.log(`Error occurred: ${error.message}`);
        next(error);
      });
  });
  
  // PUT /events/:eventId - Updates a specific event by id
  router.put("/events/:eventId", isAuthenticated, isOwner, (req, res, next) => {
    const { eventId } = req.params;
    const newDetails = req.body;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified ID is not valid" });
        return;
    }

    Event.findByIdAndUpdate(eventId, newDetails, { new: true })
      .then((eventsFromDB) => {
        res.status(200).json(eventsFromDB);
      })
      .catch((error) => {
        console.log(`Error occurred: ${error.message}`);
        res.status(400).json({ message: "You're not owner of this event, you can't edit it" });
      });
  });
  
  // DELETE /api/events/:eventId - Deletes a specific event by id
  router.delete("/events/:eventId", isAuthenticated, isOwner, (req, res, next) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified ID is not valid" });
        return;
    }

    Event.findByIdAndDelete(eventId)
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        console.log(`Error occurred: ${error.message}`);
        res.status(400).json({ message: "You're not owner of this event, you can't delete it" });
      });
  });
  module.exports = router;
  