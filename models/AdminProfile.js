const mongoose = require('mongoose');

const AdminProfileSchema = new mongoose.Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'admin'
    },
    faculty:{
        type: String
    },
    location:{
        type: String
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

module.exports = AdminProfile =mongoose.model('adminprofile',AdminProfileSchema);