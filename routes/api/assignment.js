const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Assignment = require('../../models/Assignments');

router.get('/',(req,res) => {
    Assignment.find()
    .then(assignment => res.json(assignment))
});

router.post('/',[
    check('assignmentName', 'Assignment Name is Required')
    .not()
    .isEmpty(),
    check('dueDate','Due Date is Required')
    .not()
    .isEmpty()
],async(req,res) =>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()}); 
    }
    console.log(req.body);

    const {
        assignmentName,
        dueDate,
        comittedUrl,
        modifiedDate,
        marks,
        course,
        student
    } = req.body;

    const assignmentFields ={};
    
    assignmentFields.assignmentName = assignmentName;
    if(course)assignmentFields.course = course;
    if(dueDate)assignmentFields.dueDate = dueDate;
    if(comittedUrl)assignmentFields.comittedUrl = comittedUrl;
    if(modifiedDate)assignmentFields.comittedUrl = comittedUrl;
    if(marks)assignmentFields.marks = marks;
    if(student)assignmentFields.student = student;

    {
        try{
            let assignment = await Assignment.findOne({assignmentName});
            //update
            if(assignment){
                assignment = await Assignment.findOneAndUpdate({assignmentName},assignmentFields);
                return res.status(200).json(assignment);
            }
            //create
            assignment = new Assignment(assignmentFields);
            await assignment.save();
            return res.status(200).json(assignment);

        }catch(err){
            console.error(err.message);
            res.status(500).send('server Error');
        }
    }
});

router.get('/:assignmentName',async(req,res) => {
    try {
        const assignment = await Assignment.findOne({ assignmentName : req.params.assignmentName});
        //if no course
        if(!assignment) return res.status(400).json({msg:'Assignment Not found'});

        //if have course 
        res.json(assignment);
        
    } catch (err) {
         console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Assignment Not found'});
         }
         res.status(500).send('Server Error');
        
    }
});

router.get('/student/:studentID',async(req,res) => {
    try {
        const assignment = await Assignment.find({student : req.params.studentID});
        res.json(assignment);
        
    } catch (err) {
         console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Assignment Not found'});
         }
         res.status(500).send('Server Error');
        
    }
});

router.get('/course/:courseID',async(req,res) => {
    try {
        const assignment = await Assignment.find({course : req.params.courseID});
        res.json(assignment);
        
    } catch (err) {
         console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Assignment Not found'});
         }
         res.status(500).send('Server Error');
        
    }
});

router.delete('/:assignmentName',async(req,res) => {
    try{
        let assignment = await Assignment.findOneAndDelete({assignmentName : req.params.assignmentName});

        if(!assignment) return res.status(400).json({errors:[{msg:'Assignment Not Found !'}]});
 
        return res.status(200).json({msg:'Assignment Deleted !'});

    }catch(err){

        console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Assignment Not found'});
         }
         res.status(500).send('Server Error');
    }
});

module.exports=router;