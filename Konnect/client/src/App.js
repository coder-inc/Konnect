import React from 'react' ;
import NavBar from './components/NavBar' ;
import './App.css' ;
import {BrowserRouter,Route, Routes} from 'react-router-dom' ;
import Home from './components/screens/Home' ;
import Login from './components/screens/Signin' ;
import Profile from './components/screens/Profile' ;
import Signup from './components/screens/Signup' ;
import CreatePost from './components/screens/CreatePost' ;

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/create" element={<CreatePost/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;