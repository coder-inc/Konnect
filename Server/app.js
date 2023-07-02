const express = require('express') ; // called for express
const mongoose = require('mongoose') ; // called for mongoose
const {MONGOURI} = require('../Server/keys') // restructured the url
require("dotenv").config();

const app = express() ; // invoked the express created


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}) ;
mongoose.connection.on('connected',()=>{ // After successful connection this callback function runs
    console.log("connected to mongo") ;
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err) ;
})

require("./Models/user") ; // Registering model in app.js..we are not storing this in const because we are not exporting in the user.js..also error comes that we used the same model in multiple files when exported from user.js and stored here 
require('./Models/post') ;

app.use(express.json()) ; // to take all the incoming requests from frontend in JSOn
app.use(require('./Routes/auth')) ; //Registering routes
app.use(require('./Routes/post')) ; 
app.use(require('./Routes/user')) ; 

                                        //TUTORIAL STARTS
// //constructing a middleware
// const customMiddleware = (req,res,next)=>{  //It is a code which takes an incoming request and modifies it before it reaches to the acuatal route handler like lets say user makes a request of get request to a slash as done in app.get so middle ware will come in between and modify this request before it reaches 
//     console.log("middleware executed") ;
//     next() ;
// }

// // app.use(customMiddleware) ; //is written if we want to use middleware for all the routes

// app.get('/',(req,res)=>{ // after slash there is a callback function in which req means request and res we have provide that means response.
//     console.log("home") ; // Before this middleware is executed
//     res.send("Hello World") ;  //Hello world through node is printed at localhost:5000
// }) // inside .get we can put anything after slash but the localhost will get edited accordingly like /home => localhost:5000/home

// app.get('/about',customMiddleware,(req,res)=>{ // about page is created
//     console.log("about") ; // we can middleware after a comma instead of writing it in app.use beacuase in app.use it runs for all but if we write it after comma in a particular route then it runs for itself only
//     res.send("About Page") ;
// })
//TUTORIAL ENDS

                                        
app.all('*', (req, res) => {
res.status(404).json({ message: 'Route not found' });
});

// Get all environment variables
const environmentVariables = process.env;
console.log(environmentVariables);

const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });

// app.listen(PORT,()=>{
//     console.log('Server is running on',PORT) ;  // Here we are telling the app to listen that at PORT print server is running on .
// })