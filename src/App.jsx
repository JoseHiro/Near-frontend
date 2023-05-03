import React, {useState, useEffect, useCallback} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { AuthContext } from './Context/auth-context';
import Home from './Pages/Home/Home';
import User from './Pages/User/User';

import Posts from './Pages/Posts/Posts';
import Post from './Pages/Posts/Post/Post';
import EditPost from './Pages/Posts/Edit-post/Edit-post';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Form from './Pages/SignIn/Form'
import Login from './Pages/Login/Login'
import Edit from './Pages/User/Edit/Edit';
import Delete from './Pages/User/Delete/Delete';
import PostJob from './Pages/Posts/Post-Job/Post-job';
import './index.css';

function App() {

  // const [loginState, setLogin] = useState({token: null, userId: null})
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(() =>{
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    setToken(token);
    setUserId(userId);
  },[])

  const logout = useCallback(()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    navigate('/');
  },[])

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expireDate = localStorage.getItem('expiryDate');

    if(!token || !expireDate){
      //logout handler
      return;
    }

    if(new Date(expireDate) <= new Date()){
      logout();
      return;
    }
    const userId = localStorage.getItem('userId');
    // setLogin({token: token, userId: userId});
  },[])

  const handleUpdateLogin = () => {
    const token = localStorage.getItem('token');
    const expireDate = localStorage.getItem('expiryDate');
    const userId = localStorage.getItem('userId');
    // setLogin({token: token, userId: userId})
  }

  return (
  <>
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
        }}>
      <Navbar/>
      <Routes>
        <Route path={`/`} element={<Home/>}></Route>
        <Route path={`/signin`} element={<Form/>}></Route>
        <Route path={`/login`} element={<Login login={handleUpdateLogin}/>}></Route>

        <Route path={`/posts`} element={<Posts/>}></Route>
        <Route path={`/post/:postId`} element={<Post/>}></Route>
        <Route path={`/post/edit/:postId`} element={<EditPost/>}></Route>
        <Route path={`/user/post-job`} element={<PostJob/>}></Route>

        <Route path={`/user/:userId`} element={<User/>}></Route>
        <Route path={`/user/edit/:userId`} element={<Edit/>} ></Route>
        <Route path={`/user/payment/:userId`} element={<User/>}></Route>
        <Route path={`/user/delete/:userId`} element={<Delete/>}></Route>
      </Routes>
      <Footer/>
    </AuthContext.Provider>
  </>
  );
}

export default App;
