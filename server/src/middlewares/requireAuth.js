const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports =(req, res, next) => {
    // extract jwt from authroization in headers
    const { authorization } = req.headers; // authorization === 'Bearer <jwt>'

    if (!authorization)
        return res.status(401).send({ error: 'You must be logged in' });
    
    // extract only the token
    const token = authorization.replace('Bearer ', '');

    // ensure the secret is consistent whereever used
    jwt.verify(token, 'SecretToken', async (err, payload) => {
        if (err)
            return res.status(401).send({ error: 'Please log in' });
        
        // extract userId from payload
        const { userId } = payload; 

        // search for user in db & assign to req object
        const user = await User.findById(userId);

        req.user = user;

        next();
    });
};