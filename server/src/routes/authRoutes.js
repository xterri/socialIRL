// request handling logic to handle authentication
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const router = express.Router();

// when post req made to /signup run the function
router.post('/signup', async (req, res) => {
    try {
        // add other items to here to save to db (ex. username, phone number, name)
        const { email, password, confirmPassword } = req.body;

        // TODO: add more checks to confirm proper email is entered, etc.
        if (password === confirmPassword) {
            const user = new User({ email, password });

            await user.save();

            const token = jwt.sign({ userId: user._id }, 'SecretToken'); // secret = customizable
            res.send({ token });
        } else {
            res.status(429).send('Passwords do not match');
        }
    } catch (err) {
        console.log(err.message);
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) 
        return res.status(422).send({ error: 'Must provide email and password' });

    const user = await User.findOne({ email });

    if (!user) 
        return res.status(422).send({ error: 'Invalid password or email' });

    try {
        await user.comparePassword(password);

        const token = jwt.sign({ userId: user._id }, 'SecretToken');
        res.send ({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
})

module.exports = router;