const mongoose = require('mangoose');
const Schema = mongoose.Schema;

const InstPostSchema = new Schema({
    instructor:{
        type:Schema.Types.ObjectId,
        ref:'instructor'
    },
    text:{
        type:String,
        required: true
    },
    name:{
        type: String
    },
    avatar:{
        type: String
    },
    likes:[
        {
            instructor:{
                type: Schema.Types.ObjectId,
                ref: 'instructor'
            }
        }
    ],
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = InstructorPost = mongoose.model('instructorpost',InstPostSchema); 