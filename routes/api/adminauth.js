const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Admin = require('../../models/Admin');
const config = require('config');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');


router.get('/', auth, async (req, res) =>{
    try{
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
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
        let admin = await Admin.findOne({email});
        

        if(!admin){
           return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

        //checking password

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

       

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

module.exports = router;
 