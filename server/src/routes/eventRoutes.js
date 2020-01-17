const express = require('express');
const mongoose = require('mongoose');

// ensure user is signed in
const requireAuth = require('../middlewares/requireAuth');

const Event = mongoose.model('Event');

const router = express.Router();

// if user signed in, continue to with requests
router.use(requireAuth); // issue with the requireAuth....

router.get('/events', async (req, res) => {
    let events = [];

    if (!req.user.view) {
        // no view param, return all events
        events = await Event.find(); // currently returns first 20 results

    } else if (req.user.view === 'user') {
        // display other users' events
        events = await Event.find({ interestedUsers: { $ne: req.user._id }, hostId: { $ne: req.user._id }});

    } else if (req.user.view === 'host') {
        // display events created by host
        events = await Event.find({ hostId: req.user._id });
    }

    // console.log(returnEvents);
    // TODO: iterate to get all results? handle the # of results here or in client?
    // https://docs.mongodb.com/manual/reference/method/db.collection.find/
    res.send(events);
});

router.post ('/events', async (req, res) => {
    const eventDetails = req.body;

    // update req if eventId is passed
    if (eventDetails.eventId) {
        let event = await Event.find({ _id: eventDetails.eventId });
        let likedUsers = [];

        // if interestedUsers array is defined, save current list to newArray
        if (event[0].interestedUsers && event[0].interestedUsers.length) {
            likedUsers = event[0].interestedUsers;
        } 

        // push currently interested user to new Array
        likedUsers.push(req.user._id);

        // update event.interestedUsers
        await Event.updateOne(
            // locate document to update
            { _id: eventDetails.eventId }, 
            { $set: 
                { 
                    interestedUsers: likedUsers 
                }
            }
        );

        res.send(event);
    } else {
        // TODO: add more to requirements
        if (!eventDetails.title || !eventDetails.description || !eventDetails.eventDate) {
            return res.status(423).send({ error: 'Please provide a title, description and date' });
        }

        try {
            const event = new Event({ 
                hostId: req.user._id,
                hostname: req.user.email,
                title: eventDetails.title,
                description: eventDetails.description,
                timestamp: new Date(),
                createDate: '',
                eventDate: eventDetails.eventDate,
            });

            let date = new Date(event.timestamp);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            event.createDate = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + '\t'+ date.getHours() +  ':' + date.getMinutes();

            await event.save();

            res.send(event);
        } catch (err) {
            res.status(422).send({ error: err.message });
        };
    }
});

module.exports = router;