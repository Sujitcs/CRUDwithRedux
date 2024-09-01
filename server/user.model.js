const mongoose = require('mongoose');
const userschema= new mongoose.Schema({
    'email':{
        type:String,
        required:true,
        unique:true
    },
    'password':{
        type:String,
        required:true
    },
    'firstname':{
        type:String,
        required:true
    },
    'lastname':{
        type:String,
        required:true
    },
    'phone':{
        type:String,
        required:true
    },
},{versionKey:false})
module.exports=mongoose.model('usermodel',userschema)
console.log('user model is ready')
