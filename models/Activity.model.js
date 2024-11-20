const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    environment: {
        type: String,
        enum: ['Aquatic', 'Mountain', 'Forest', 'Beach', 'Urban', 'Other']
    },
    location:{
        type: String,
        required: true,
    },
    events: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Events'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
    }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;