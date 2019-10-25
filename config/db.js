const mongose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


// connecting to db 
const connectDB = async() =>{
    try{
        await mongose.connect(db,{
            useNewUrlParser: true,
            useCreateIndex:true,
            useFindAndModify: false
        });
        
        console.log('MongoDB Connected ......')
    }catch(err){
        console.log(err);

        //exit app
        process.exit(1);

    }
}

module.exports = connectDB;