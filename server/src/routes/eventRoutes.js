const express = require('express');
const mongoose = require('mongoose');

// ensure user is signed in
const requireAuth = require('../middlewares/requireAuth');

const Event = mongoose.model('Event');

const router = express.Router();

// if user signed in, continue to with requests
router.use(requireAuth);

router.get('/events', async (req, res) => {
    const events = await Event.find(); // currently returns first 20 results

    // TODO: iterate to get all results? handle the # of results here or in client?
    // https://docs.mongodb.com/manual/reference/method/db.collection.find/
    res.send(events);
});

router.post ('/events', async (req, res) => {
    const eventDetails = req.body;

    // TODO: add more to requirements
    if (!eventDetails.title || !eventDetails.description || !eventDetails.eventDate) {
        return res.status(422).send({ error: 'Please provide a title, description and date' });
    }

    try {
        const event = new Event({ 
            hostId: req.user._id,
            title: eventDetails.title,
            description: eventDetails.description,
            timestamp: _id.getTimeStamp(),
            eventDate: eventDetails.eventDate,
        });

        await event.save();

        res.send(event);
    } catch (err) {
        res.status(422).send({ error: err.message });
    };
});

module.exports = router;