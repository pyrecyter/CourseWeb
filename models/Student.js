const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
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
    sid: {
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
    enrollmentKeys:[{
        type : String
    }]


});

module.exports = Student = mongoose.model('student',StudentSchema);