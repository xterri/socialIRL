const mongoose = require('mongoose');

// Event Schema
const eventSchema = new mongoose.Schema({
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    createDate: { // when event was created
        date: {
            type: Date, 
            default: Date.now
        },
        timestamp: Number
    },
    eventDate: Date,
    eventTime: Number,
    // TODO: review what details required when host sets a location
    location: {
        type: { type: String }, // set as 'Point' when creating data
        coordinates: [], // longitude, latitude
    },
    participants: Number,
    interestedUsers: [] // array so we can add # of users
});

eventSchema.index({ "location": "2dsphere" });

mongoose.model('Event', eventSchema);