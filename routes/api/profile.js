const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const request = require('request');
const config = require('config');

const Student = require('../../models/Student');
const Profile = require('../../models/Profile');

//@route GET api/profile/me
//@desc  Get current user profile 
//@access Private

router.get('/me', auth, async (req, res) =>{
    try{
        //checking student
        const profile  = await Profile.findOne({student: req.student.id}).populate('student', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg: 'There is a Profile FOr this Student'});
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
        location,
        status,
        skills,
        bio,
        githubusername
    } = req.body

    //Build Profile Object

    const profileFields = {};
    profileFields.student = req.student.id;
    if(faculty) profileFields.faculty = faculty;
    if(course) profileFields.course = course;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    if(bio) profileFields.bio = bio;
    if(githubusername) profileFields.githubusername = githubusername;

    
    try{
        let profile = await Profile.findOne({ student: req.student.id });
        //Update
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {student: req.student.id},
                {$set: profileFields },
                { new: true}
                );

                return res.json(profile);


        }
        //Create 

        profile = new Profile(profileFields);

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
        const profiles = await Profile.find().populate('student',['firstname', 'avatar']);
        res.json(profiles);
        
    } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
        
    }
});

//@route GET api/profile/student/:student_id
//@desc  GET profile by user ID
//@access Public

router.get('/student/:student_id', async(req,res) =>{
    try {
        const profile = await Profile.findOne({ student: req.params.student_id}).populate('student',['firstname', 'avatar']);
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
        await Profile.findOneAndRemove({ student: req.student.id});
        //Remove Student
        await Student.findOneAndRemove({ _id: req.student.id});
        res.json({msg:'Student Deleted'});
        
    } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
        
    }
});

//@route GET api/profile/github/:username
//@desc  get user repo from github
//@access Public

router.get('/github/:username', (req,res) =>{
    try {
        const option={
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers:{ 'user-agent': 'node.js'}
        };

        request(option,(error, response, body) =>{
            if(error) console.error(error);
            if(response.statusCode !== 200){
                return res.status(404).json({msg:'No Github profile Found'});
            }
            res.json(JSON.parse(body));

        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server Error')
    }
})






module.exports = router;
