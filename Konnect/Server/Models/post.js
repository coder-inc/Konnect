const mongoose = require('mongoose') ;
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"User"}], //likes features which in takes data of type object and referes to user for it.
    comments:[{ //each element of the array will be text of type string and will contain postedBy of type objectId
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy:{
        type : ObjectId,
        ref:"User" //refer to the user model(built a relation between user.js and post.js)
    }
})

mongoose.model("Post",postSchema) ;