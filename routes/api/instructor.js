const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const Instructor = require('../../models/Instructor');

router.get('/',async(req,res) => {
    Instructor.find().then(instructor => res.json(instructor));
});

router.post('/',[
    check('firstname', 'First Name is Required')
    .not()
    .isEmpty(),
    check('lastname','Last Name is Required')
    .not()
    .isEmpty(),
     check('email', 'Please Enter a Valid Email Address').isEmail(),
     check('password', 'Please Enter Password  with 6 or more characters').isLength({min:6})

],
async(req, res) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()}); 
    }
    console.log(req.body);

    const {firstname, lastname, email, password } = req.body;

    try{
        //Check User Exsist
        let instructor = await Instructor.findOne({email});

        if(instructor ){
           return res.status(400).json({errors:[{msg:'User already exists'}]}); 
        }


        //Getting Gravatar OF email
        const  avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        instructor = new Instructor({
            firstname,
            lastname,
            email,
            password,
            avatar
        });

        //Encrypting Password 

        const salt  = await bcrypt.genSalt(10);

        instructor.password  = await bcrypt.hash(password, salt);

        await instructor.save();

        //JsonWebToken 
                //creating payload
                const payload ={
                    instructor:{
                        id: instructor.id
                    }
                }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000 },
            (err, token ) => {
                if (err) throw err;
                res.json({ token })
            }
            );

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

   
});

router.get('/:id',async(req,res) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        //if no course
        if(!instructor) return res.status(400).json({msg:'Instructor Not found'});

        //if have course 
        res.json(instructor);
        
    } catch (err) {
         console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Instructor Not found'});
         }
         res.status(500).send('Server Error');
        
    }
});

router.put('/:id',[
    check('firstname', 'First Name is Required')
    .not()
    .isEmpty(),
    check('lastname','Last Name is Required')
    .not()
    .isEmpty(),
     check('email', 'Please Enter a Valid Email Address').isEmail(),
     check('password', 'Please Enter Password  with 6 or more characters').isLength({min:6})

],async(req,res) =>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()}); 
    }
    console.log(req.body);

    const {firstname, lastname, email, password } = req.body;

    try{

        const salt  = await bcrypt.genSalt(10);

        instrustureObj =({
            firstname,lastname,email,password
        });

        instrustureObj.password  = await bcrypt.hash(password, salt);

        let instructor = await Instructor.findOneAndUpdate(req.params.id,instrustureObj);

        if(!instructor) return res.status(400).json({errors:[{msg:'Instructor Not Found !'}]});

        return res.status(200).json(instructor);

    }catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
           return res.status(400).json({msg:'Instructor Not found'});
        }
        res.status(500).send('Server Error');
    }
});

router.delete('/:id',async(req,res) => {
    try{
        let instructor = await Instructor.findOneAndDelete(req.params.id);

        if(!instructor) return res.status(400).json({errors:[{msg:'Instructor Not Found !'}]});
 
        return res.status(200).json({msg:'Instructor Deleted !'});

    }catch(err){

        console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Instructor Not found'});
         }
         res.status(500).send('Server Error');
    }
});

router.post('/:id/course/add/:courseID/:status',async(req,res) => {
    try{
        const instructor = await Instructor.findById(req.params.id);
        
        if(!instructor) return res.status(400).json({errors:[{msg:'Instructor Not Found !'}]});
        if(instructor.course.filter(course => course.name  === req.params.courseID).length > 0){
            const removeIndex =instructor.course.map(course => course.name).indexOf(req.params.courseID);
            instructor.course.splice(removeIndex, 1 );
            instructor.course.unshift({name:req.params.courseID,status:req.params.status});
            await instructor.save();
            return res.status(200).json({ msg:'Couse status updated !'});
        }
        instructor.course.unshift({name:req.params.courseID,status:req.params.status});
        await instructor.save();
        return res.status(200).json(instructor);

    }catch(err){
        console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Instructor or Course Not found'});
         }
         res.status(500).send('Server Error');
    }
});

router.delete('/:id/course/remove/:courseID',async(req,res) => {
    try{
        const instructor = await Instructor.findById(req.params.id);

        if(instructor.course.filter(course => course.name  === req.params.courseID).length == 0){
            return res.status(400).json({ msg:'Course not added !'});
        }
        //get removed index 
        const removeIndex =instructor.course.map(course => course.name).indexOf(req.params.courseID);

        instructor.course.splice(removeIndex, 1 );

        //saving to database
        await instructor.save();

        res.json(instructor.course);
    }catch(err){
        console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Instructor or Course Not found'});
         }
         res.status(500).send('Server Error');
    }
});

module.exports = router;
