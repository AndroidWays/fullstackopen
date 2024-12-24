// models/user.js

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
    },
    // Token for authentication
    token: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // Omit the password hash and token from the returned object
        delete returnedObject.passwordHash;
        delete returnedObject.token;
    },
});

module.exports = mongoose.model('User', userSchema);
