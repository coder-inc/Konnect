import React, { createContext, useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  console.log(userid);

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setProfile(result);
      })
      .catch(error => console.log(error));
  }, [userid]);

  return (
    <>
      {userProfile ? (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: "18px 0px",
            borderBottom: "1px solid grey"
          }}>
            <div>
              <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                src="https://media.istockphoto.com/id/1430286042/photo/focus-businessman-designer-and-computer-planning-typing-and-strategy-for-working-in-modern.webp?b=1&s=170667a&w=0&k=20&c=tyncL3Dd_2xFbUfrdvG5cvhWx-8ATolXx4zs-Bh44J4=" alt="#" />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
                <h6>{userProfile.posts ? userProfile.posts.length : 0}</h6>
                <h6>40 Followers</h6>
                <h6>40 Following</h6>
              </div>
            </div>
          </div>
          <div className='gallery'>
            {userProfile.posts && userProfile.posts.length > 0 ? (
              userProfile.posts.map(item => (
                <img key={item._id} className='item' src={item.photo} alt={item.title} />
              ))
            ) : (
              <h2>No posts available.</h2>
            )}
          </div>
        </div>
      ) : (
          <h2>Loading...!</h2>
        )}
    </>
  );
}

export default Profile;
