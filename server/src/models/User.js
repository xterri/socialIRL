const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    email: { // replace with phone number
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    view: {
        type: String
    }
});

userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) =>{
            if (err) return reject(err);
            if (!isMatch) return reject(false);
            resolve(true);
        });
    });
};

mongoose.model('User', userSchema);