// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity.model')
const { isAuthenticated } = require('../middleware/jwt.middleware');

// ACTIVITY ROUTES
// POST /activities - Creates a new activity
router.post("/activities", isAuthenticated, (req, res, next) => {
    const newActivity = req.body;
    Activity.create(newActivity)
        .then((activityFromDB) => {
            res.status(201).json(activityFromDB);
        })
        .catch((error) => {
            console.log(`Error occurred while creating a new activity: ${error.message}`);
            res.status(400).json({ message: "Error creating a new activity. Please log in." });
        });
});


// GET /api/activities - Retrieves all the activities
router.get("/activities", (req, res, next) => {
    Activity.find()
        .then((activitiesFromDB) => {
            res.status(200).json(activitiesFromDB);
        })
        .catch((error) => {
            console.log(`Error occurred: ${error.message}`);
            next(error);
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
            console.log(`Error occurred: ${error.message}`);
            next(error)
        });
});

// GET /api/category/:category - Retrieves activity by category
router.get("/activities/category/:category", (req, res, next) => {
    
    const { category } = req.params;

    
    Activity.find({ category })
        .populate('events')  
        .then(activities => {
            res.status(200).json(activities);  
        })
        .catch(error => {
            console.log(`Error occurred: ${error.message}`);
            next(error); 
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