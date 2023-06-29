import React,{useState,useEffect,useContext} from 'react' ;
import {UserContext} from '../../App'

const Home = () =>{
    const [data,setData] = useState([]) ;
    const {state} = useContext(UserContext) //state has the details of user who has logged in
    useEffect(()=>{
        fetch('/allpost',{
                headers:{
                    "Authorization": "Bearer "+ localStorage.getItem("jwt") //jwt is always present if successfully logged in hence no need to check whether present or not
                }
            }).then(res=>res.json())
            .then(result=>{
                setData(result.posts) ;
            })
        },[]) ;

    const likePost = (id)=>{
        fetch('/like',{
            method: "put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result) ;
            const newData = data.map(item=>{
                if(item._id===result._id){   //means record has been updated
                    return result ;// returning updated record
                } 
                else{
                    return item ;
                }
            })
            setData(newData) ;
        }).catch(err=>{
            console.log(err) ;
        })
    }

    const unlikePost = (id)=>{
        fetch('/unlike',{
            method: "put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result) ;
            const newData = data.map(item=>{
                if(item._id===result._id){   //means record has been updated
                    return result ;// return ing updated record
                } 
                else{
                    return item ;
                }
            })
            setData(newData) ;
        }).catch(err=>{
            console.log(err) ;
        })
    }

    return (
        <div className='home'>
        {
            data.map(item=>{
                return(
                    <div className='card home-card' key={item._id}>
                        <h5>Abhishek</h5>
                            <div className='card-image'>
                                <img src={item.photo} alt='#'/>
                            </div>
                            <div className='card-content'>
                            <i className="material-icons" style={{color:'red'}}>favorite</i>
                            {item.likes.includes(state._id) // if user has already liked hide the like button but if not the nhide the unlike button
                            ?   <i className="material-icons"
                            onClick={()=>{unlikePost(item._id)}}>
                            thumb_down
                            </i>
                            :
                            <i className="material-icons" 
                            onClick={()=>{likePost(item._id)}}>
                            thumb_up
                            </i>
                            }
                            {/* how many likes on the post */}
                                <h6>{item.likes.length} likes</h6> 
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                            <input type='text' placeholder='add a comment'/>
                        </div>
                    </div>
                )
            })
        }
            
        </div>
    )
}

export default Home ;