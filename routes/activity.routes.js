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
            res.status(400).json({ 
                message: "Failed to create a new activity. Please ensure you are logged in and all required fields are provided.", 
                error: error.message 
            });
        });
});


// GET /api/activities - Retrieves all the activities
router.get("/activities", (req, res, next) => {
    Activity.find()
        .then((activitiesFromDB) => {
            res.status(200).json(activitiesFromDB);
        })
        .catch((error) => {
            console.log(`Failed to retrieve activities: ${error.message}`);
            res.status(500).json({ 
                message: "Unable to retrieve activities. Please try again.", 
                error: error.message });
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
            console.log(`Failed to retrieve the activity with ID ${req.params.id}: ${error.message}`);
            res.status(404).json({ 
                message: `Activity with ID ${req.params.id} not found.`, 
                error: error.message 
            });
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
            console.log(`Failed to retrieve activities for category ${category}: ${error.message}`);
            res.status(404).json({ 
                message: `No activities found for category ${category}.`, 
                error: error.message 
            });
        });
});


// PUT /api/activities/:activityId - Updates a specific activity by id
// router.put("/activities/:id", isAuthenticated, (req, res, next) => {
//     Activity.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(updatedActivity => {
//             res.status(200).json(updatedActivity);
//         })
//         .catch(error => {
//            
//         });
// });


// DELETE /api/activities/:activityId - Deletes a specific activity by id
// router.delete("/activities/:id", isAuthenticated, (req, res, next) => {
//     Activity.findByIdAndDelete(req.params.id)
//         .then(() => {
//             res.status(204).send();
//         })
//         .catch(error => {
    
//         });
// });

module.exports = router;