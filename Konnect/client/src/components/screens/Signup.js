import React,{useState} from 'react' ;
import {Link} from 'react-router-dom'

const Signup = () =>{
    const[name,setName] = useState("") ;
    const[password,setPassword] = useState("") ;
    const[email,setEmail] = useState("") ;
    const postData = ()=>{  //connecting frontend to backend to receive the post in the backend in JOSn form 
        fetch("http://localhost:5000/signup",{
            method: "post" ,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "",
                email: "",
                password: ""
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data) ;
        })
    }
    return (
        <div className='mycard'>
            <div className="card auth-card input-field">
                <h2>Konnect</h2>
                <input 
                    type='text'
                    placeholder='Name'
                    value = {name} //getting the value of name from backend
                    onChange={(e)=>setName(e.target.value)}
                />
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
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" // whenever this button is hit the PostData function will run and respond to the backend. CORS(cross Origin Resource Sharing) error can come if we use different port numbers on node and react(eg. node- 5000 and react- 3000) to prevent this we install cors package...But rather than using this we can use proxy in package.json
                onClick={()=>postData()}> 
                    Signup
                </button>
                <h5> 
                    <Link to='/signin'>Already have an account ?</Link> 
                </h5>
            </div>
        </div>
    )
}

export default Signup ;