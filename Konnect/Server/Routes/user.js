const express = require('express') ;
const router = express.Router() ; // we will be making routes in separate file thats wwhy we are using routes from express
const mongoose = require('mongoose') ;
const requireLogin = require('../Middleware/requirelogin') ;
const Post = mongoose.model("Post") ;
const User = mongoose.model("User") ;

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.param.id})
        .populate("postedBy","_id name")
        .then(err=>{
            return res.json({user,Post}) ;
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not Found"}) ;
    })
}) //if someone wants to see the profile of other user they will make a req on the slash user and then the id of the user, hence we will reciev the id

module.exports = router