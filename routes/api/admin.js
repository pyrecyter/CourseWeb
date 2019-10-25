const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const Admin = require('../../models/Admin');

router.get('/',async(req,res) => {
    Admin.find().then(admin => res.json(admin))
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
        let admin = await Admin.findOne({email});

        if(admin){
           return res.status(400).json({errors:[{msg:'Admin already exists'}]}); 
        }


        //Getting Gravatar OF email
        const  avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        admin = new Admin({
            firstname,
            lastname,
            email,
            password,
            avatar
        });

        //Encrypting Password 

        const salt  = await bcrypt.genSalt(10);

        admin.password  = await bcrypt.hash(password, salt);

        await admin.save();

        //JsonWebToken 
                //creating payload
                const payload ={
                    admin:{
                        id: admin.id
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

router.delete('/:id',async(req,res) => {
    try{
        let admin = await Admin.findOneAndDelete(req.params.id);

        if(!admin) return res.status(400).json({errors:[{msg:'Admin Not Found !'}]});
 
        return res.status(200).json({msg:'Admin Deleted !'});

    }catch(err){

        console.error(err.message);
         if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Admin Not found'});
         }
         res.status(500).send('Server Error');
    }
});

module.exports = router;
