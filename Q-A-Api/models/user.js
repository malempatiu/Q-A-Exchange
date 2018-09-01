const mongoose = require('mongoose'),
    validator = require('validator'),
    Question = require('./questions');

//User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    username: {
        type: String,
        required: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minlength: 6
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

//User Model
const User = mongoose.model('User', userSchema);

module.exports = User;