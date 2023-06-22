const express = require('express') ;
const router = express.Router() ; // we will be making routes in separate file thats wwhy we are using routes from express
const mongoose = require('mongoose') ;
const User = mongoose.model("User") ; 
const bcryptjs = require('bcryptjs') // bcrypt is js package whic his used to hide the password(encrypt it) and installed using npm install bcryptjs
const jwt = require('jsonwebtoken') ;

router.get('/',(req,res)=>{
    res.send("hello") ;
})

router.post('/signup',(req,res)=>{ //posting data(name email pass) through request after user requests the callback function will fire
    // console.log(req.body) ; // After the user sends the data(Name, pass etc.), we can get through this
    const {name,email,password} = req.body ; // we are taking all the data and storing it in a const set
    if(!email || !password || !name){ // If these datas are not present then run the below message
        return res.status(422).json({error:"Please add all the fields"}) ; //if we encounter error then we don't wish to proceed further thats why put a return //.status is return in order to update the status to 422 and .json is written in order to return the message in JSON //422 means server has understood the request but could'nt respond to it
    }
    else{
        // res.json({message:"Successfully Posted"}) ;
    }
    User.findOne({email:email}) //using a method findone which queries the DB with the key email and its value is equal to what we are getting
    .then((savedUser)=>{
        if(savedUser){
            return es.status(422).json({error:"user already exists with that email"}) ;
        }
        bcryptjs.hash(password,12) // it is used to encrypt the password giving a 12 character encrypted password default value is 10
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
    
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err) ;
            })
        })
    }) 
    .catch(err=>{
        console.log(err)
    })
}) // this route can be tested through postman becuase we can not directly test this thorugh browser


router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"}) ;
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcryptjs.compare(password,savedUser.password) // we are compaing the passwords already in the database with the passwords entered through frontend
        .then(doMatch=>{ // if matched then successful
            if(doMatch){
                // res.json({message:"successfully signed in"}) ; // instead of this message we should send user a token so that after successfully signed he can access all of his protected data
                // to generate token we use json web token package using npm install jsonwebtoken
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"}) ;
            }
        })
        .catch(err=>{
            console.log(err) ; // this will give all the errors which are generated from our side (developer side)
        })
    })
})


module.exports = router ;// export this router