//This file is created to create a model and tell mongoDB that what type of data we will be storing 

const mongoose = require('mongoose') ;

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
    }
});

mongoose.model("User",userSchema) ;// Giving name to the model