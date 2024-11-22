const mongoose = require('mongoose');
const router = require('express').Router();
const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


// EVENT ROUTES
// POST /events - Creates a new event
router.post("/events", (req, res, next) => {
    const newEvent = req.body;
  
    Event.create(newEvent)
      .then((eventFromDB) => {
        res.status(201).json(eventFromDB);
      })
      .catch((error) => {
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
        next(error);
        console.log(error);
      });
  });
  

  // GET /api/events/activities/:activityId - Retrieves all of the events for a given activity
  // router.get("/events/activities/:activityId", (req, res, next) => {
  //   const { activityId } = req.params;

  //   if (!mongoose.Types.ObjectId.isValid(activityId)) {
  //       res.status(400).json({ message: "Specified ID is not valid" });
  //       return;
  //   }

  //   Event.find({ activity: activityId })
  //   //   .populate("")
  //     .then((eventsFromDB) => {
  //       res.status(200).json(eventsFromDB);
  //     })
  //     .catch((error) => {
  //       next(error);
  //       console.log(error);
  //     });
  // });
  
  // PUT /events/:eventId - Updates a specific event by id
  router.put("/events/:eventId", isAuthenticated, (req, res, next) => {
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
        next(error);
        console.error(error);
      });
  });
  
  // DELETE /api/events/:eventId - Deletes a specific event by id
  router.delete("/events/:eventId", isAuthenticated, (req, res, next) => {
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
        next(error);
        console.error("Error deleting event...");
        console.error(error);
      });
  });
  module.exports = router;
  