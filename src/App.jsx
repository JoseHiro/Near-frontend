import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import User from './Pages/User/User';
import Navbar from './Components/Navbar/Navbar';
import Form from './Pages/SignIn/Form'
import Login from './Pages/Home/Login/Login'
import Edit from './Pages/User/Edit/Edit';
import './index.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginState, setLogin] = useState({token: null, userId: null})

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expireDate = localStorage.getItem('expiryDate');

    if(!token || !expireDate){
      //logout handler
      return;
    }

    if(new Date(expireDate) <= new Date()){
      handleSignOut();
      return;
    }

    const userId = localStorage.getItem('userId');
    setLogin({token: token, userId: userId});
    setLoggedIn(true);
  },[])

  const handleUpdateLogin = () =>{
    const token = localStorage.getItem('token');
    const expireDate = localStorage.getItem('expiryDate');
    const userId = localStorage.getItem('userId');
    setLoggedIn(true);
    setLogin({token: token, userId: userId})
  }

  const handleSignOut = () => {
    setLogin({token: null, userId: null,})
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }

  return (<>
    <Navbar isLoggedIn={isLoggedIn} userId={loginState.userId} signOut={handleSignOut}/>
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home/>}></Route>
        <Route path={`/signin`} element={<Form/>}></Route>
        <Route path={`/login`} element={<Login login={handleUpdateLogin}/>}></Route>
        <Route path={`/user/:id`} element={<User userId={loginState.userId}/>}></Route>
        <Route path={`/user/edit`} element={<Edit userId={loginState.userId}/>} ></Route>
        <Route path={`/user/payment`} element={<User/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
