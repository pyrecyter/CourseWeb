const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    assignmentName:{
        type : String,
        required : true,
        unique:true
    },
    dueDate:{
        type : Date,
        required : true
    },
    comittedUrl:{
        type: String,
        required : false
    },
    modifiedDate:{
        type : Date,
        required : false
    },
    course:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        required:false
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student'
    }
});

module.exports = Assignment = mongoose.model("assignment",AssignmentSchema);