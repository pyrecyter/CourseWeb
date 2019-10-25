const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const InstructorPost = require('../../models/InstructorPost');
const Instructor = require('../../models/Instructor');

// @route  POST api/posts
// @desc   Create a post by instructor
// @access Private
router.post('/',[auth, [
    check('text','Text is Required')
    .not()
    .isEmpty()
    ]
], 
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }   

    try {
        const instructor = await Instructor.findById(req.instructor.id).select('-password');

        const newPost = new InstructorPost({
            text: req.body.text,
            name : instructor.name,
            avatar: instructor.avatar,
            instructor: req.instructor.id
        });

        const post = await newPost.save();
        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
}
);

module.exports = router;