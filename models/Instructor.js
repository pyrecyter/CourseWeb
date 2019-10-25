const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    course:[{
        name:{
        type: String,
        },
        status:{
            type:Number
        }
    }] 


});

module.exports = Instructor = mongoose.model('instructor',InstructorSchema);