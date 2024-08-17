const mongoose = require("mongoose")
module.exports=()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connected successfully');
    }catch(err){
        console.log('DB connect faield',err);
        throw err;
    }
}