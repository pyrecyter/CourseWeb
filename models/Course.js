const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    coursename: {
        type: String,
        required: true,
        unique: true
    }, 
    faculty: {
        type: String,
        required: true
    },
    status:{
        type:Number,
        required:true,
        default:0
    },
    enrollmentKey:{
        type:String,
        required:true
    },
    courseCredits: {
        type: Number,
        required: true
    },

});

module.exports = Course = mongoose.model('course',CourseSchema);