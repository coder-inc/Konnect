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

router.put('follow',(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id} // this person is being followed so we are pushing the logged in user id
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId},

        },{new:true}).then(result=>{
            res.json(result) ;
        })
        .catch(err=>{
            return res.status(422).json({error:err})
        }) ;
    }
    ) ; // this the ID of the person who is being followed
})


router.put('unfollow',(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id} // this person is being followed so we are pushing the logged in user id
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId},

        },{new:true}).then(result=>{
            res.json(result) ;
        })
        .catch(err=>{
            return res.status(422).json({error:err})
        }) ;
    }
    ) ; // this the ID of the person who is being followed
})

module.exports = router