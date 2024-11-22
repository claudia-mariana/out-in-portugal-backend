// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity.model')
const { isAuthenticated } = require('../middleware/jwt.middleware');

// ACTIVITY ROUTES
// POST /activities - Creates a new activity
router.post("/activities",  (req, res, next) => {
    const newActivity = req.body;
    console.log(req.body)
    Activity.create(newActivity)
        .then((activityFromDB) => {
            res.status(201).json(activityFromDB);
        })
        .catch((error) => {
            next(error);
            res.status(500).json({ error: "Failed to create a new activity" });
        });
});


// GET /api/activities - Retrieves all the activities
router.get("/activities", (req, res, next) => {
    Activity.find()
        .then((activitiesFromDB) => {
            res.status(200).json(activitiesFromDB);
        })
        .catch((error) => {
            next(error);
            res.status(500).json({ error: "Failed to get list of activities" });
        });
});


// GET /api/activities/:activityId - Retrieves a specific activity by id
router.get("/activities/:id", (req, res, next) => {
    Activity.findById(req.params.id)
        .populate('events')
        .then(activity => {
            res.status(200).json(activity);
        })
        .catch(error => {
            next(error)
        });
});


// PUT /api/activities/:activityId - Updates a specific activity by id
// router.put("/activities/:id", isAuthenticated, (req, res, next) => {
//     Activity.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(updatedActivity => {
//             res.status(200).json(updatedActivity);
//         })
//         .catch(error => {
//             next(error)
//         });
// });


// DELETE /api/activities/:activityId - Deletes a specific activity by id
// router.delete("/activities/:id", isAuthenticated, (req, res, next) => {
//     Activity.findByIdAndDelete(req.params.id)
//         .then(() => {
//             res.status(204).send();
//         })
//         .catch(error => {
//             next(error)
//         });
// });

module.exports = router;