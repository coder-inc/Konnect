//This file is created to create a model and tell mongoDB that what type of data we will be storing 

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true 
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/konnectcnq/image/upload/f_auto,q_auto/v43492jzfntaklew4dhb"
    },
    followers:[{ type:ObjectId,ref:"User"}],
    following:[{ type:ObjectId,ref:"User"}]
});

mongoose.model("User",userSchema) ;// Giving name to the model