const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    lectureName:{
        type : String,
        required : true,
        unique:true
    },
    comittedUrl:{
        type: String,
        required : true
    },
    course:{
        type:String,
        required:true
    }
});

module.exports = Lecture = mongoose.model("lecture",LectureSchema);