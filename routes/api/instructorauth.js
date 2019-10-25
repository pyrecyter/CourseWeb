const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Instructor = require('../../models/Instructor');
const config = require('config');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');


router.get('/', auth, async (req, res) =>{
    try{
        const instructor = await Instructor.findById(req.instructor.id).select('-password');
        res.json(instructor);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
} );

//@route  POST api/auth
//@dec    Authencate user and get token
//@acces  public

router.post('/',[
   
     check('email', 'Please Enter a Valid Email Address').isEmail(),
     check('password', 'Password is Required').exists()

],
async(req, res) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()}); 
    }
    console.log(req.body);

    const {email, password } = req.body;

    try{
        //Check User Exsist
        let instructor = await Instructor.findOne({email});
        

        if(!instructor){
           return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

        //checking password

        const isMatch = await bcrypt.compare(password, instructor.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

       

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

module.exports = router;
 