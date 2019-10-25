const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const Student = require('../../models/Student');



router.post('/',[
    check('firstname', 'First Name is Required')
    .not()
    .isEmpty(),
    check('lastname','Last Name is Required')
    .not()
    .isEmpty(),
     check('email', 'Please Enter a Valid Email Address').isEmail(),
     check('sid','Student ID is Required').not().isEmpty(),
     check('password', 'Please Enter Password  with 6 or more characters').isLength({min:6})

],
async(req, res) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()}); 
    }
    console.log(req.body);

    const {firstname, lastname, email, sid, password } = req.body;

    try{
        //Check User Exsist
        let student = await Student.findOne({email});
        let Sid = await Student.findOne({sid});

        if(student || Sid ){
           return res.status(400).json({errors:[{msg:'User already exists'}]}); 
        }


        //Getting Gravatar OF email
        const  avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        student = new Student({
            firstname,
            lastname,
            email,
            sid,
            password,
            avatar
        });

        //Encrypting Password 

        const salt  = await bcrypt.genSalt(10);

        student.password  = await bcrypt.hash(password, salt);

        await student.save();

        //JsonWebToken 
                //creating payload
                const payload ={
                    student:{
                        id: student.id
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

module.exports = router;
