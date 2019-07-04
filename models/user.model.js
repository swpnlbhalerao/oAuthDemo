const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:String,
    googleId:String,
    email:String,
    thumbnail:String
});

module.exports=mongoose.model('User',userSchema);


