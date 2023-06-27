import React,{useState,useContext} from 'react' ;
import {Link,useNavigate} from 'react-router-dom' ;
import {UserContext} from '../../App' ;
import M from "materialize-css" ;

const Signin = () =>{
    const {state,dispatch} = useContext(UserContext) ;
    const Navigate = useNavigate() ; // creating for navigating the user to a location after successful output
    const[password,setPassword] = useState("") ;
    const[email,setEmail] = useState("") ;
    const postData = ()=>{  //connecting frontend to backend to receive the post in the backend in JOSN form 
        // eslint-disable-next-line
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){ //regex expression to check correct email...copied from emailregex.com
             M.toast({html: "Invalid email id",classes:"#c62828 red darken-3"}) ; //for creating pop-up message
             return ;
        }
        
        fetch("/signin",{  //Both node and react have different servers so inorder to send data to node we are sending our req from port 3000 to 5000 of mode sp added a proxy in package.json
            method: "post" ,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data) ;
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"}) ; //for creating pop-up message
            }
            else{
                localStorage.setItem("jwt",data.token) ; // we need to save the token to the local storage as the file uploading is protected
                localStorage.setItem("user",JSON.stringify(data.user)) ;
                dispatch({type:"USER",payload:data.user}) ;
                M.toast({html:"Login Successful",classes:"#43a047 green darken-1"}) ;
                Navigate('/')//Navigating the user to the home screen
            }
        }).catch(err=>{
            console.log(err) ;
        })
    }

    return (
        <div className='mycard'>
            <div className="card auth-card input-field">
                <h2>Konnect</h2>
                <input 
                    type='text'
                    placeholder='Email Id'
                    value = {email} //getting the value of email from backend
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                    type='text'
                    placeholder='Password'
                    value = {password} //getting the value of password from backend
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>postData()}>
                    Signin
                </button>
                <h5>
                    <Link to='/signup'>Don't have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin ;