// root file for server
const express = require('express');
const mongoose = require('mongoose');

// represents our entire application; associate route handlers with this
const app = express();

const mongoUri = 'mongodb+srv://socialIRLAdmin:socialIRLP@$$w0rd@cluster0-hdt24.mongodb.net/test?retryWrites=true&w=majority'

// connect to db
mongoose.connect(mongoUri, {
    // adding in below to prevent common err msgs & warnings from appearing
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// check connetion to Mongoose instance
mongoose.connection.on('connected', () => {
    // excuted if connection successful
    console.log('Connected to Mongo Instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

// root handler
// GET call made to root route; function is auto called with req obj (incoming http req) & res obj (outgoing response)
app.get('/', (req, res) => { 
    res.send('Test Route');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});