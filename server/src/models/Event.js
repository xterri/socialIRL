const mongoose = require('mongoose');

// Event Schema
const eventSchema = new mongoose.Schema({
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    hostname: String,
    title: String,
    description: {
        type: String,
        default: ''
    },
    timestamp: Number, // when event was created
    createDate: String,
    eventDate: String,

    /* LEAVE OUT FOR NOW UNTIL OK WITH DB
    eventTime: Number,
    // TODO: review what details required when host sets a location
    location: {
        type: { type: String }, // set as 'Point' when creating data
        coordinates: [], // longitude, latitude
    },
    participants: Number,
    */
   
    interestedUsers: [] // array so we can add # of users
});

eventSchema.index({ 'location': '2dsphere' });

mongoose.model('Event', eventSchema);