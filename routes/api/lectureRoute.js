const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Lecture = require('../../models/lecture');

router.get('/',(req,res) =>{
    Lecture.find()
    .then(lecture => res.json(lecture))
});

router.get('/:courseID',(req,res) =>{
    Lecture.find({course:req.params.courseID})
    .then(lecture => res.json(lecture))
});

router.post('/',[
    check('lectureName', 'Assignment Name is Required')
    .not()
    .isEmpty(),
    check('comittedUrl','Due Date is Required')
    .not()
    .isEmpty(),
    check('course','Due Date is Required')
    .not()
    .isEmpty()
],async (req,res)=>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()}); 
    }
    const {
        lectureName,
        comittedUrl,
        course,
    } = req.body;

    const lecFields ={};
    if(lectureName)lecFields.lectureName = lectureName;
    if(course)lecFields.course = course;
    if(comittedUrl)lecFields.comittedUrl = comittedUrl;

    try{
        let lecture = await Lecture.findOne({lectureName});
        if(lecture){
            return res.status(400).json({msg:{err:"Lecture already uploaded"}});
        }
        //create
        lecture = new Lecture(lecFields);
        await lecture.save();
        return res.status(200).json(lecture);

    }catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
    }
});

router.delete('/:lecName',async(req,res) => {
    try{
        let lecture = await Lecture.findOneAndDelete({lectureName : req.params.lecName});

        if(!lecture) return res.status(400).json({errors:[{msg:'Lecture Not Found !'}]});
 
        return res.status(200).json({msg:'Lecture Deleted !'});

    }catch(err){
        console.error(err.message);
         res.status(500).send('Server Error');
    }
});

module.exports=router;