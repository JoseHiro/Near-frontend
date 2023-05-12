import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/auth-context';
import Home from './Pages/Home/Home';
import User from './Pages/User/User';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Geocode from './Components/Geocode/Geocode';

import Posts from './Pages/Posts/Posts';
import Post from './Pages/Posts/Post/Post';
import EditPost from './Pages/Posts/Edit-post/Edit-post';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Signin from './Pages/SignIn/Signin'
import Login from './Pages/Login/Login'
import Edit from './Pages/User/Edit/Edit';
import Delete from './Pages/User/Delete/Delete';
import PostJob from './Pages/Posts/Post-Job/Post-job';
import './index.css';

function App() {

  // const [loginState, setLogin] = useState({token: null, userId: null})
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userName, setUserName] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(() =>{
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    setToken(token);
    setUserId(userId);
    setUserName(userName);
  },[])

  const logout = useCallback(()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setToken(null);
    setUserId(null);
    setUserName(null);
    navigate('/');
  },[])

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expireDate = localStorage.getItem('expiryDate');

    if(!token || !expireDate){
      // logout();
      return;
    }

    if(new Date(expireDate) <= new Date()){
      logout();
      return;
    }
  },[])

  // const handleUpdateLogin = () => {
  //   const token = localStorage.getItem('token');
  //   const expireDate = localStorage.getItem('expiryDate');
  //   const userId = localStorage.getItem('userId');
  //   setLogin({token: token, userId: userId})
  // }

  return (
  <>
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        login: login,
        logout: logout
        }}>
      <Navbar/>
      <Routes>
        <Route path={`/`} element={<Home/>}></Route>
        <Route path={`/signin`} element={<Signin/>}></Route>
        <Route path={`/login`} element={<Login/>}></Route>
        <Route path={`/map`} element={<Geocode/>}></Route>

        <Route path={`/posts`} element={<Posts/>}></Route>
        <Route path={`/post/:postId`} element={<Post/>}></Route>
        <Route path={`/post/edit/:postId`} element={<EditPost/>}></Route>
        <Route path={`/user/post-job`} element={<PostJob/>}></Route>

        <Route path={`/user/:userId`} element={<User/>}></Route>
        <Route path={`/user/edit/:userId`} element={<Edit/>} ></Route>
        <Route path={`/user/payment/:userId`} element={<User/>}></Route>
        <Route path={`/user/delete/:userId`} element={<Delete/>}></Route>

        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </AuthContext.Provider>
  </>
  );
}

export default App;
