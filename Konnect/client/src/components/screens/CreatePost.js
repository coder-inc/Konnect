import React,{useState,useEffect} from "react";
import M from "materialize-css" ;
import {useNavigate} from 'react-router-dom'

const CreatePost = ()=>{
    const Navigate = useNavigate() ;
    const [title,setTitle] = useState("") ;
    const [body,setBody] = useState("") ;
    const [image,setImage] = useState("") ;
    const [url,setUrl] = useState("") ;
    useEffect(()=>{
        if(url){
            fetch("/createpost",{  //Both node and react have different servers so inorder to send data to node we are sending our req from port 3000 to 5000 of mode sp added a proxy in package.json
                method: "post" ,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title: title,
                    body:body,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data) ;
                if(data.error){
                    M.toast({html: data.error,classes:"#c62828 red darken-3"}) ; //for creating pop-up message
                }
                else{
                    M.toast({html:"Created Post Successfully",classes:"#43a047 green darken-1"}) ;
                    Navigate('/')//Navigating the user to the home screen
                }
            }).catch(err=>{
                console.log(err) ;
            })
        }
        // eslint-disable-next-line
    },[url]) // this url changes useEffect will kick in later

    const postDetails = ()=>{ //posting all the images at cloudinary
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
        // separate network request to our server to post the data
        // when the above fetch is completely done then only the below fetch should work
        
    }
    return(
        <div className="card input-filed" style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input 
            type="text" 
            placeholder="title"
            value = {title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text"
            placeholder="body"
            value = {body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}>
                    Submit Post
            </button>
        </div>
    )
}

export default CreatePost ;