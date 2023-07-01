const express = require('express') ;
const router = express.Router() ; // we will be making routes in separate file thats wwhy we are using routes from express
const mongoose = require('mongoose') ;
const requireLogin = require('../Middleware/requirelogin') ;
const Post = mongoose.model("Post") ;
const User = mongoose.model("User") ;

router.get('/user/:id', requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    const posts = await Post.find({ postedBy: req.params.id }).populate('postedBy', '_id name');
    res.json({ user, posts });
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
});//if someone wants to see the profile of other user they will make a req on the slash user and then the id of the user, hence we will reciev the id

  router.put('/follow', requireLogin, async (req, res) => {
    try {
      const result = await User.findByIdAndUpdate(
        req.body.followId,
        {
          $push: { followers: req.user._id },// this person is being followed so we are pushing the logged in user id
        },
        { new: true }
      ).select("-password"); // this is written to hide password
  
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },// this the ID of the person who is being followed
        },
        { new: true }
      ).select("-password");
  
      res.json(result);
    } catch (err) {
      res.status(422).json({ error: err });
    }
  });
  

  router.put('/unfollow', requireLogin, async (req, res) => {
    try {
      const result = await User.findByIdAndUpdate(
        req.body.unfollowId,
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      ).select("-password");
  
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      ).select("-password");
  
      res.json(result);
    } catch (err) {
      res.status(422).json({ error: err });
    }
  });
  
  router.put('/updatepic', requireLogin, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { pic: req.body.pic } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update profile picture' });
    }
  });

module.exports = router