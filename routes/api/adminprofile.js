const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const request = require('request');
const config = require('config');

const Admin = require('../../models/Admin');
const AdminProfile = require('../../models/AdminProfile');

//@route GET api/profile/me
//@desc  Get current user profile 
//@access Private

router.get('/me', auth, async (req, res) =>{
    try{
        //checking admin
        const AdminProfile  = await AdminProfile.findOne({admin: req.admin.id}).populate('admin', ['name', 'avatar']);

        if(!AdminProfile){
            return res.status(400).json({msg: 'There is a Profile for this Admin'});
        }
        //geting details to json
        res.json(AdminProfile);

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
    .isEmpty()

] 
], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }

    const{
        faculty,
        location,
        skills,
        bio
    } = req.body

    //Build Profile Object

    const profileFields = {};
    profileFields.admin = req.admin.id;
    if(faculty) profileFields.faculty = faculty;
    if(location) profileFields.location = location;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    if(bio) profileFields.bio = bio;

    
    try{
        let profile = await AdminProfile.findOne({ admin: req.admin.id });
        //Update
        if(profile){
            profile = await AdminProfile.findOneAndUpdate(
                {admin: req.admin.id},
                {$set: profileFields },
                { new: true}
                );

                return res.json(profile);


        }
        //Create 

        profile = new AdminProfile(profileFields);

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
        const profiles = await AdminProfile.find().populate('admin',['firstname', 'avatar']);
        res.json(profiles);
        
    } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
        
    }
});

//@route GET api/profile/admin/:admin_id
//@desc  GET profile by user ID
//@access Public

router.get('/admin/:admin_id', async(req,res) =>{
    try {
        const profile = await AdminProfile.findOne({ admin: req.params.admin_id}).populate('admin',['firstname', 'avatar']);
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
        await AdminProfile.findOneAndRemove({ admin: req.admin.id});
        //Remove Admin
        await Admin.findOneAndRemove({ _id: req.admin.id});
        res.json({msg:'Admin Deleted'});
        
    } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
        
    }
});


module.exports = router;
