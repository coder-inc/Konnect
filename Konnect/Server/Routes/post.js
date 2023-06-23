const express = require('express') ;
const router = express.Router() ; // we will be making routes in separate file thats wwhy we are using routes from express
const mongoose = require('mongoose') ;
const requireLogin = require('../Middleware/requirelogin') ;
const Post = mongoose.model("Post") ;

router.get('/allpost',(req,res)=>{
    Post.find() // to get all the posts
    .populate("PostedBy","_id name") // written to get only the selected info of the user
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"Please Add all the fields"}) ;
    }
    // console.log(req.user)
    // res.send("ok") ;
    req.user.password = undefined // to not store password in the post.js data
    const post = new Post({
        title,
        body,
        postedBy : req.user // who posted it
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

//posts created by the user itself
router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id}) // all the post posted by the user who has logged in, is requested
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost}) ;
    })
    .catch(err=>{
        console.log(err) ;
    })
})

module.exports = router