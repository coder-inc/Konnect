import React, { createContext, useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const[image,setImage] = useState("") ;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch('/mypost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        setPics(result.mypost);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch posts");
        setLoading(false);
      });
  }, []);

  useEffect(()=>{
    if(image){
      setLoading(true);
      setError("");


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
          // setUrl(data.url) ; // when this gets executed the useEffect kicks in and useEffect calls a network request to node
          fetch('/updatepic', {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              pic: data.url
            })
          })
            .then(res => res.json())
            .then(result => {
              localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              setLoading(false);
            })
            .catch(err => {
              setError("Failed to update profile picture");
              setLoading(false);
            });
        })
        .catch(err => {
          setError("Failed to upload image");
          setLoading(false);
        });
    }
  }, [image, dispatch]);

  const updatePhoto = (file) => {
    setImage(file);
  }

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div style={{ margin: "18px 0px", borderBottom: "1px solid grey" }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : ""}
              alt="#"
            />
          </div>
          <div>
            <h4>{state ? state.name : "loading"}</h4>
            <h5>{state ? state.email : "loading"}</h5>
            {state && state.followers && state.following ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
                <h6>{mypics.length}</h6>
                <h6>{state.followers.length} Followers</h6>
                <h6>{state.following.length} Following</h6>
              </div>
            ) : (
              <h6>Loading...</h6>
            )}
          </div>
        </div>
        <div className="btn #64b5f6 blue darken-1">
          <span>Update Pic</span>
          <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
        </div>
      </div>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className='gallery'>
          {mypics.map(item => (
            <img key={item._id} className='item' src={item.photo} alt={item.title} />
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Profile;
