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

router.get('/getsubpost',requireLogin,(req,res)=>{ // posts of all the users i follow
    Post.find({postedBy:{$in:req.user.following}}) // to get all the posts from my following list
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
    console.log(title,body,pic) ;
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

router.put('/like', requireLogin, async (req, res) => {
    try {
      const result = await Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { likes: req.user._id } },
        { new: true }
      ).exec();
  
      res.json(result);
    } catch (err) {
      res.status(422).json({ error: err });
    }
});
router.put("/unlike", requireLogin, async (req, res) => {
    try {
      const result = await Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { likes: req.user._id } },
        { new: true }
      ).exec();
  
      res.json(result);
    } catch (err) {
      res.status(422).json({ error: err });
    }
});
router.put('/comment', requireLogin, async (req, res) => {
    try {
      const comment = {
        text: req.body.text,
        postedBy: req.user._id
      };
  
      const result = await Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: comment } },
        { new: true }
      )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec();
  
      res.json(result);
    } catch (err) {
      res.status(422).json({ error: err });
    }
  });

  router.delete('/deletepost/:postId', requireLogin, async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec();
  
      if (!post) {
        return res.status(422).json({ error: "Post not found" });
      }
  
      if (post.postedBy._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
  
      const result = await post.remove();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }); // parameter is given after colon so that postId specific post gets deleted

module.exports = router