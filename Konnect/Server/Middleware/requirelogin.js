const jwt = require('jsonwebtoken') ;
const {JWT_SECRET} = require('../keys') ;
const mongoose = require('mongoose') ;
const User = mongoose.model("User") ;

module.exports = (req,res,next)=> {
    const {authorization} = req.headers ; // here we get authorization as 'Bearer eqqdalsnwenan(token)'
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"}) // unauthorized
    }
    const token = authorization.replace("Bearer ","") // this is done to get token alone 
    jwt.verify(token,JWT_SECRET,(err,payload)=>{ // it is done to verify the token through a secret key(JWT_SECRET)
        if(err){
            return res.status(401).json({error:"you must be logged in"}) ;
        }
        const {_id} = payload // destructuring the id from payload
        User.findById(_id).then(userdata=>{
            req.user = userdata ; // accessing the user data through this
            next()
        })
    })
}