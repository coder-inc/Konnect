import React,{useContext} from 'react' ;
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../App';

const NavBar = ()=>{
    const {state,dispatch} = useContext(UserContext) // // state has the user details
    const Navigate = useNavigate() ;
    const renderList = ()=>{
      if(state){ // if state exists that means login successful so only two options needs to be shown... we have to get rid of signin and signup then
        return [ // we are outputing an array
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/create">Create Post</Link></li>,
          <li><Link to="/myfollowingpost">My Following Posts</Link></li>,
          <li>
              <button className="btn #c62828 red darken-3"
                onClick={()=>{
                  localStorage.clear() ;
                  dispatch({type:"CLEAR"}) ;
                  Navigate('/signin') ;
                }}>
                Logout
                {/* after clicking this button the action type becomes clear and state becomes null */}
              </button>
          </li>
        ]
      }
      else{ // if state doesnt exits that means login unsuccessful
        return [
          <li><Link to="/signin">Signin</Link></li>,
          <li><Link to="/signup">Signup</Link></li>
        ]
      }
    }

    return (
        <nav>
    <div className="nav-wrapper white" style={{padding:"0px 10px"}}>
    {/* if state exists then redirect to home and if not redirect signin...This is the reason why we used context*/}
      <Link to={state?"/":"signin"} className="brand-logo left">Konnect</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default NavBar ;