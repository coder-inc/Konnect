import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
const Home = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        fetch('/getsubpost', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setData(result.posts);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const likePost = id => {
        fetch('/like', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const unlikePost = id => {
        fetch('/unlike', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId,
                text
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const deletePost = async (postId) => {
        try {
            const response = await fetch(`/deletepost/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            });

            if (response.ok) {
                // Post deleted successfully
                console.log('Post deleted successfully');
            } else {
                // Handle error response
                console.error('Failed to delete post:', response.status);
            }
        } catch (error) {
            // Handle network or other runtime errors
            console.error('Error occurred while deleting post:', error);
        }
    };

    return (
        <div className='home'>
            {data.map(item => (
                <div className='card home-card' key={item._id}>
                    <h5 style={{padding:"5px"}}>
                        {item.postedBy && (
                            <Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}` : '/profile'}>
                                {item.postedBy.name}
                            </Link>
                        )}
                    </h5>
                    {
                        <i
                            className='material-icons'
                            style={{ float: 'right' }}
                            onClick={() => deletePost(item._id)}
                        >
                            delete
                        </i>
                    }
                    <div className='card-image'>
                        <img src={item.photo} alt='#' />
                    </div>
                    <div className='card-content'>
                        <i className='material-icons' style={{ color: 'red' }}>
                            favorite
                        </i>
                        {item.likes.includes(state._id) ? (
                            <i className='material-icons' onClick={() => unlikePost(item._id)}>
                                thumb_down
                            </i>
                        ) : (
                            <i className='material-icons' onClick={() => likePost(item._id)}>
                                thumb_up
                            </i>
                        )}
                        {/* How many likes on the post */}
                        <h6>{item.likes.length} likes</h6>
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                        {item.comments.map(record => (
                            <h6 key={record._id}>
                                <span style={{ fontWeight: '500' }}>
                                    {record.postedBy && record.postedBy.name}
                                </span>
                                {record.text}
                            </h6>
                        ))}
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                makeComment(e.target[0].value, item._id);
                            }}
                        >
                            <input type='text' placeholder='add a comment' />
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Home;
