const express = require('express');
const mongoose = require('mongoose');

// ensure user is signed in
const requireAuth = require('../middlewares/requireAuth');

const Event = mongoose.model('Event');

const router = express.Router();

// if user signed in, continue to with requests
router.use(requireAuth); // issue with the requireAuth....

router.get('/events', async (req, res) => {
    const events = await Event.find(); // currently returns first 20 results
    const userId = String(req.user._id);

    let returnEvents = [];

    if (!req.query.view) {
        // no view param, return all events
        res.send(events);
    } else if (req.query.view === 'user') {
        // display other users events
        events.map(async (event) => {
            if (String(event.hostId) !== userId) {
                returnEvents.push(event);
            }
        });
    } else if (req.query.view === 'host') {
        // display events created by host
        returnEvents = await Event.find({ hostId: req.user._id });
    }

    // console.log(returnEvents);
    // TODO: iterate to get all results? handle the # of results here or in client?
    // https://docs.mongodb.com/manual/reference/method/db.collection.find/
    res.send(returnEvents);
});

router.post ('/events', async (req, res) => {
    const eventDetails = req.body;

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
});

module.exports = router;