const express = require('express') ;
const router = express.Router() ; // we will be making routes in separate file thats wwhy we are using routes from express
const mongoose = require('mongoose') ;
const requireLogin = require('../Middleware/requirelogin') ;
const Post = mongoose.model("Post") ;

router.get('/allpost',requireLogin,(_req,res)=>{
    Post.find() // to get all the posts
    .populate("postedBy","_id name") // written to get only the selected info of the user
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic} = req.body
    if(!title || !body || !pic){
        return res.status(422).json({error:"Please Add all the fields"}) ;
    }
    // console.log(req.user)
    // res.send("ok") ;
    req.user.password = undefined // to not store password in the post.js data
    const post = new Post({
        title,
        body,
        photo:pic, //picture to send to the cloudinary
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

router.put("/like",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}},{
            new:true // we are pushing in the likes array, the id of the user who is logged in 
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err}) ;
        }
        else{
            res.json(result) ;
        }
    })
})
router.put("/unlike",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}},{new:true // we are pushing in the likes array, the id of the user who is logged in 
        }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err}) ;
        }
        else{
            res.json(result) ;
        }
    })
})

module.exports = router