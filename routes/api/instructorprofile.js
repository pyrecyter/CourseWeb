const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const request = require('request');
const config = require('config');

const Instructor = require('../../models/Instructor');
const InstructorProfile = require('../../models/InstructorProfile');

//@route GET api/profile/me
//@desc  Get current user profile 
//@access Private

router.get('/me', auth, async (req, res) =>{
    try{
        //checking student
        const profile  = await InstructorProfile.findOne({instructor: req.instructor.id}).populate('instructor', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg: 'There is a Profile for this Instructor'});
        }
        //geting details to json
        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST api/profile
//@desc  create or update user profile 
//@access Private

router.post('/',[auth, [
    check('faculty','Faculty is required')
    .not()
    .isEmpty(),
    check('course','Course is required')
    .not()
    .isEmpty(),
    check('subjects','Subject is required')
    .not()
    .isEmpty()

] 
], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }

    const{
        faculty,
        course,
        subjects,
        location,
        status,
        skills,
        bio        
    } = req.body

    //Build Profile Object

    const profileFields = {};
    profileFields.instructor = req.instructor.id;
    if(faculty) profileFields.faculty = faculty;
    if(course) profileFields.course = course;
    if(subjects) profileFields.subjects = subjects;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    if(bio) profileFields.bio = bio;

    
    try{
        let profile = await InstructorProfile.findOne({ student: req.student.id });
        //Update
        if(profile){
            profile = await InstructorProfile.findOneAndUpdate(
                {instructor: req.instructor.id},
                {$set: profileFields },
                { new: true}
                );

                return res.json(profile);


        }
        //Create 

        profile = new InstructorProfile(profileFields);

        await profile.save();
        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
    }



});

//@route GET api/profile
//@desc  GET all  profile 
//@access Public

router.get('/', async(req,res) =>{
    try {
        const profiles = await InstructorProfile.find().populate('instructor',['firstname', 'avatar']);
        res.json(profiles);
        
    } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
        
    }
});

//@route GET api/profile/instructor/:instructor_id
//@desc  GET profile by user ID
//@access Public

router.get('/instructor/:instructor_id', async(req,res) =>{
    try {
        const profile = await InstructorProfile.findOne({ instructor: req.params.instructor_id}).populate('instructor',['firstname', 'avatar']);
        //if no profile
        if(!profile) return res.status(400).json({msg:'Profile Not found'});

        //if have profile 
        res.json(profile);
        
    } catch (err) {
         console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Profile Not found'});
         }
         res.status(500).send('Server Error');
        
    }
});

//@route DELETE api/profile
//@desc  Delete profile user, profile ,assingments
//@access Private

router.delete('/',auth, async(req,res) =>{
    try {
        
        //Remove Profile 
        await InstructorProfile.findOneAndRemove({ instructor: req.instructor.id});
        //Remove Student
        await Instructor.findOneAndRemove({ _id: req.instructor.id});
        res.json({msg:'Instructor Deleted'});
        
    } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
        
    }
});


module.exports = router;
