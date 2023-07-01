import React,{useState, useEffect} from 'react' ;
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css' ; //done to use materialise M. function.... installed using npm install

const Signup = () =>{
    const Navigate = useNavigate() ; // creating for navigating the user to a location after successful output
    const[name,setName] = useState("") ;
    const[password,setPassword] = useState("") ;
    const[email,setEmail] = useState("") ;
    const[image,setImage] = useState("") ;
    const[url,setUrl] = useState(undefined) ;
    useEffect(()=>{
        if(url){
            uploadFields() ;
        }
    },[url])
    const uploadPic = ()=>{
        const data = new FormData() ; // if we want to upload a file then we need to do this
        data.append("file",image) ;
        data.append("upload_preset","konnect") ; // in cloudinary I gave my upload preset a name Konnect
        data.append("cloud_name","konnectcnq") ; // cloud name is konnectcnq
        fetch("https://api.cloudinary.com/v1_1/konnectcnq/image/upload",{
            method:"post",
            body:data
        })// API base URl from cloudinary itself and appended /image/upload after link
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url) ; // when this gets executed the useEffect kicks in and useEffect calls a network request to node
        })
        .catch(err=>{
            console.log(err) ;
        })
    }

    const uploadFields = ()=>{
        // eslint-disable-next-line
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){ //regex expression to check correct email...copied from emailregex.com
            M.toast({html: "Invalid email id",classes:"#c62828 red darken-3"}) ; //for creating pop-up message
            return ;
       }
       
       fetch("/signup",{  //Both node and react have different servers so inorder to send data to node we are sending our req from port 3000 to 5000 of mode sp added a proxy in package.json
           method: "post" ,
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               name: name,
               email: email,
               password: password,
               pic:url
           })
       }).then(res=>res.json())
       .then(data=>{
           if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"}) ; //for creating pop-up message
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"}) ;
               Navigate('/signin')//Navigating the user to the login screen
           }
       }).catch(err=>{
           console.log(err) ;
       })
    }

    const postData = ()=>{  //connecting frontend to backend to receive the post in the backend in JOSN form
        if(image){
            uploadPic() ;
        } 
        else{
            uploadFields() ;
        }
        
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
                    type='password'
                    placeholder='Password'
                    value = {password} //getting the value of password from backend
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Pic</span>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
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