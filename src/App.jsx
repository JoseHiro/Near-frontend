import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Form from './SignIn/Form'
import Login from './Login/Login'

function App() {

  const [loginState, setLogin] = useState({
    isAuth: false,
    token: null,
    userId: null,
  })

  useEffect(() => {
    console.log('heelo')
    const token = localStorage.getItem('token');
    const expireDate = localStorage.getItem('expiryDate');

    if(!token || !expireDate){
      //logout handler
      return ;
    }

    if(new Date(expireDate) <= new Date()){
      handleSignOut();
      return ;
    }

    const userId = localStorage.getItem('userId');
    setLogin({isAuth: true, token: token, userId: userId})
    console.log(loginState);
  },[])

  const handleSignOut = () => {
    setLogin({isAuth: false, token: null, userId: null,})
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  }


  return (<>
    <Navbar isLoggedIn={loginState.isAuth} signOut={handleSignOut}/>
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home/>}></Route>
        <Route path={`/signin`} element={<Form/>}></Route>
        <Route path={`/login`} element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
