import React,{createContext, useEffect, useReducer, useContext} from 'react' ;
import NavBar from './components/NavBar' ;
import './App.css' ;
import {BrowserRouter,Route, Routes, useNavigate} from 'react-router-dom' ;
import Home from './components/screens/Home' ;
import Signin from './components/screens/Signin' ;
import Profile from './components/screens/Profile' ;
import Signup from './components/screens/Signup' ;
import CreatePost from './components/screens/CreatePost' ;
import {reducer,initialState} from './reducer/userReducer' ;
import UserProfile from './components/screens/UserProfile' ;
import SubscribedUserPosts from './components/screens/SubscribedUserPosts' ;


export const UserContext = createContext() ;

const Routing = ()=>{
  const Navigate = useNavigate() ;
  const {state,dispatch} = useContext(UserContext) ; // if the user closed the application but hasnt logged out so if he again opening the website he must access the protected data so for this we use this
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user")) ;
    if(user){ //if user is logged in then he can access profile 
      dispatch({type:"USER",payload:user}) ;
    }
    else{ // if user is not logged in then he cannot access profile
      Navigate('/signin') // if we dont have the user we will redirect to login page
    }
  },[]) ;
  return(
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route exact path="/profile" element={<Profile/>} /> 
      {/*exact is put their so that it doesnot coincide with UserProfile id */}
      <Route path="/signup" element={<Signup/>} />
      <Route path="/create" element={<CreatePost/>} />
      <Route path="/profile/:userid" element={<UserProfile/>} />
      <Route path="/myfollowingpost" element={<SubscribedUserPosts/>} />
    </Routes>
  )
}

function App() { // cannot access the Navigate here in the app but can be accessed inside BrowserRouter
  const [state,dispatch] = useReducer(reducer,initialState) ;
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing/>
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App ;
