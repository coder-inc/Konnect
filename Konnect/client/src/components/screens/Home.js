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
                        <h5>Abhishek Singh Sankhla</h5>
                        <div className='card-image'>
                            <img src='https://images.unsplash.com/photo-1567090723733-b8a3deb5102d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdhbGxhcGFwZXJ8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60' alt='#'/>
                        </div>
                        <div className='card-content'>
                        <i className="material-icons" style={{color:'red'}}>favorite</i>
                            <h6>Title</h6>
                            <p>Lorem ipsum dolor sit amet</p>
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