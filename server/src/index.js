// root file for server
require('./models/User');
require('./models/Event');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const requireAuth = require('./middlewares/requireAuth');

// represents our entire application; associate route handlers with this
const app = express();

// parse JSON data out of incoming request
app.use(bodyParser.json());

// associate req handlers added to router with main express app
app.use(authRoutes);
app.use(eventRoutes);

// TODO: call these in a separate file (not uploaded to git)
const mongoUri = 'mongodb+srv://socialIRLAdmin:socialIRLP@$$w0rd@cluster0-hdt24.mongodb.net/test?retryWrites=true&w=majority'

// connect to db
mongoose.connect(mongoUri, {
    // adding in below to prevent common err msgs & warnings from appearing
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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
// use 'requireAuth' to confirm if user's account & device was assigned a jwt to for access
app.get('/', requireAuth, (req, res) => { 
    res.send('Access granted');
});

// TODO: CHANGE BACK TO 8080 FOR IT TO WORK WITH GCP
app.listen(3000, () => {
    console.log('Listening on port 3000');
});