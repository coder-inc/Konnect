import React,{useState,useEffect} from 'react' ;

const Home = () =>{
    const [data,setData] = useState([]) ;
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
    return (
        <div className='home'>
        {
            data.map(item=>{
                return(
                    <div className='card home-card' key={item._id}>
                        <h5>{item.name}</h5>
                            <div className='card-image'>
                                <img src={item.photo} alt='#'/>
                            </div>
                            <div className='card-content'>
                            <i className="material-icons" style={{color:'red'}}>favorite</i>
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