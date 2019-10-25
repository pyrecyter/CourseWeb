const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    faculty:{
        type: String
    },
    course:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        
    },
    skills:{
        type: [String]
    },
    bio:{
        type: String
    },
    githubusername:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now 
    }
});

module.exports = Profile =mongoose.model('profile',ProfileSchema); 