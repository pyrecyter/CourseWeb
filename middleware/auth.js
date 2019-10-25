const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    //Get TOken from header 

    const token = req.header('x-auth-token');

    //check  if no token 

    if(!token){
        return res.status(401).json({msg: 'No Token, Authorization Denied !!'});
    }

    //verfiy Token 

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        req.student = decoded.student;
        req.admin = decoded.admin;
        req.instructor = decoded.instructor;
        next();

    }catch(err){
        res.status(401).json({msg:'Token Invalid!'});
    }


}