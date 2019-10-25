const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');


const Course = require('../../models/Course');

//@ route GET api/course
//@access Public
router.get('/',(req,res) =>{
    Course.find()
    .then(course => res.json(course))
});

//@ route POST api/course
//@access Public
router.post('/',[
    check('coursename', 'Course Name is Required')
    .not()
    .isEmpty(),
    check('faculty','Faculty is Required')
    .not()
    .isEmpty(),
    check('enrollmentKey', 'enrollmentKey is Required')
    .not()
    .isEmpty(),
    check('courseCredits', 'Course Credits is Required')
    .not()
    .isEmpty()
    
],
async(req, res) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()}); 
    }
    console.log(req.body);

    const {coursename, faculty ,enrollmentKey, courseCredits} = req.body;

    try{
        //Check Course Exsist
        let course = await Course.findOne({coursename});

        if(course){
           return res.status(400).json({errors:[{msg:'Course already exists'}]}); 
        }

        course = new Course({
            coursename,
            faculty,
            enrollmentKey,
            courseCredits
        });

        await course.save();
        return res.status(200).json(course);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
   
});

router.get('/:courseName',async(req,res) => {
    try {
        const course = await Course.findOne({ coursename : req.params.courseName});
        //if no course
        if(!course) return res.status(400).json({msg:'Course Not found'});

        //if have course 
        res.json(course);
        
    } catch (err) {
         console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Course Not found'});
         }
         res.status(500).send('Server Error');
        
    }
});

router.put('/:courseName',[
    check('coursename', 'Course Name is Required')
    .not()
    .isEmpty(),
    check('faculty','Faculty is Required')
    .not()
    .isEmpty(),
    check('enrollmentKey', 'enrollmentKey is Required')
    .not()
    .isEmpty(),
    check('courseCredits', 'Course Credits is Required')
    .not()
    .isEmpty()
],async(req,res) => {

    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()}); 
    }
    console.log(req.body);

    const {coursename, faculty ,enrollmentKey, courseCredits} = req.body;
    
    try{

         courseObj = ({
            coursename,
            faculty,
            enrollmentKey,
            courseCredits,
         });

        let course = await Course.findOneAndUpdate({coursename : req.params.courseName},courseObj);

        if(!course) return res.status(400).json({errors:[{msg:'Course Not Found !'}]});
 
        return res.status(200).json(course);
        
    }catch(err){
        console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Course Not found'});
         }
         res.status(500).send('Server Error');
    }
});

router.delete('/:courseName',async(req,res) => {
    try{
        let course = await Course.findOneAndDelete({coursename : req.params.courseName});

        if(!course) return res.status(400).json({errors:[{msg:'Course Not Found !'}]});
 
        return res.status(200).json({msg:'Course Deleted !'});

    }catch(err){

        console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Course Not found'});
         }
         res.status(500).send('Server Error');
    }
});

router.put('/approve/:courseName',async(req,res) =>{
    try {
        const course = await Course.findOne({ coursename : req.params.courseName});
        //if no course
        if(!course) return res.status(400).json({msg:'Course Not found'});

        //if have course 
        course = await Course.findOneAndUpdate({coursename : req.params.courseName},{status:1});
        return res.status.status(200).json({msg:"Course Appeoved !"});
        
    } catch (err) {
         console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Course Not found'});
         }
         res.status(500).send('Server Error');
        
    }
});

router.put('/reject/:courseName',async(req,res) =>{
    try {
        const course = await Course.findOne({ coursename : req.params.courseName});
        //if no course
        if(!course) return res.status(400).json({msg:'Course Not found'});

        //if have course 
        course = await Course.findOneAndUpdate({coursename : req.params.courseName},{status:2});
        return res.status(200).json({msg:"Course Rejected !"});

    } catch (err) {
         console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Course Not found'});
         }
         res.status(500).send('Server Error');
        
    }
});


module.exports=router;
