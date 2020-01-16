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

    if (!req.user.view) {
        // no view param, return all events
        res.send(events);
    } else if (req.user.view === 'user') {
        // display other users' events
        events.map(async (event) => {
            if (String(event.hostId) !== userId) {
                
                // filter events that user has already liked
                if (event.interestedUsers && event.interestedUsers.length) { 
                    var i = 0;
                    var arrLen = event.interestedUsers.length

                    while (i < arrLen) {
                        if (String(event.interestedUsers[i]) === userId)
                            break;
                        i++;
                    }

                    // if 'i' >= arrLen, userID match was NOT found
                    if (i >= arrLen) returnEvents.push(event);
                } else {
                    returnEvents.push(event);
                }
            }
        });
    } else if (req.user.view === 'host') {
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