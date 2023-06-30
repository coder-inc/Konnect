import React,{createContext,useEffect,useState,useContext} from 'react' ;
import {UserContext} from '../../App' ;

const Profile = () =>{
    const [mypics,setPics] = useState([]) ;
    const {state,dispatch} = useContext(UserContext) ;
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost) ;
        })
    },[])
    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{
                display:'flex',
                justifyContent:'space-around',
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px",borderRadius:"80px"}}                 
                    src="https://media.istockphoto.com/id/1430286042/photo/focus-businessman-designer-and-computer-planning-typing-and-strategy-for-working-in-modern.webp?b=1&s=170667a&w=0&k=20&c=tyncL3Dd_2xFbUfrdvG5cvhWx-8ATolXx4zs-Bh44J4=" alt="#" />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{display:'flex', justifyContent:'space-between', width:'108%'}}>
                        <h6>{mypics.length}</h6>
                        <h6>{state?state.followers.length: "..Loading"} Followers</h6>
                        <h6>{state?state.following.length: "..Loading"} Following</h6>
                    </div>
                </div>
            </div>
            <div className='gallery' >
            {
                mypics.map(item=>{
                    return(
                        <img key={item._id} className='item' src={item.photo} alt={item.title} /> //iterating through all the posts
                    )
                })
            }
            </div>
        </div>
    )
}

export default Profile ;