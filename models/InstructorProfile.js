const mongoose = require('mongoose');

const InstructorProfileSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'instructor'
    },
    faculty:{
        type: String
    },

    location:{
        type: String
    },
    //Senoir Lecturer,Assistant Lecturer
    status:{    
        type: String,
        
    },
    skills:{
        type: [String]
    },
    bio:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now 
    }
});

module.exports = InstructorProfile =mongoose.model('instructorprofile',InstructorProfileSchema);