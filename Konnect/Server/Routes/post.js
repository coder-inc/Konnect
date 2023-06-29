const express = require('express') ;
const router = express.Router() ; // we will be making routes in separate file thats wwhy we are using routes from express
const mongoose = require('mongoose') ;
const requireLogin = require('../Middleware/requirelogin') ;
const Post = mongoose.model("Post") ;

router.get('/allpost',requireLogin,(_req,res)=>{
    Post.find() // to get all the posts
    .populate("postedBy","_id name") // written to get only the selected info of the user
    .populate("comments.postedBy","_id name")
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
            // new:true // we are pushing in the likes array, the id of the user who is logged in 
    }).then((res)=>{
        res.status(422).json({error:err})
    }).catch((err)=>{
        res.json(err) ;
    })
})
router.put("/unlike",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user._id}}, // pull behaviour is to empty the array so after pressing the button likes become 0
    {new:true // we are pushing in the likes array, the id of the user who is logged in 
    }).then((res)=>{
        res.status(422).json({error:err}) ;
    }).catch((err)=>{
        res.json(err) ;
    })
})

router.put("/comment",requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}},{
            // new:true // we are pushing in the likes array, the id of the user who is logged in 
    }).populate("comments.postedBy","_id name") //to expand the id because we want more things inside from id
    .populate("postedBy","_id name")
    .then((res)=>{
        res.status(422).json({error:err})
    }).catch((err)=>{
        res.json(err) ;
    })
})

module.exports = router