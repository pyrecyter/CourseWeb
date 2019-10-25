const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:'student'
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
            student:{
                type: Schema.Types.ObjectId,
                ref: 'student'
            }
        }
    ],
    comments:[
        {
            student:{
                type: Schema.Types.ObjectId,
                ref: 'student'
            },
            text:{
                type: String,
                required: true
            },
            avatar:{
                type: String
            },
            data:{
                type: Date,
                default: Date.now
            }

        }
        
    ],
    data:{
        type: Date,
        default: Date.now
    }


});

module.exports = Post = mongoose.model('post',PostSchema);  