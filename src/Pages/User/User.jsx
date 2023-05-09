import React from 'react';
import { Link, useParams} from 'react-router-dom';
import Navbox from '../../Components/Navbox/Navbox';
import EditProfile from './Edit-Profile/Edit-Profile';
import Edit from './Edit/Edit'
import './User.css'

const User = () =>{
  const {userId} = useParams();

  const navItem = [
    { title: "User profile"},
    { title: "User informatioin"},
    { title: "Payments"},
    { title: "Delete"},
  ]

  const deleteUrl = '/user/delete/' + userId;

  const articleItem = [
    <>
      <img alt='' src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'></img>
      <EditProfile/>
    </>,
    <><Edit/></>,
    <h1>Payments</h1>,
    <Link to={deleteUrl}>Delete</Link>
  ]

  return (
    <section id="user_container">
      <h1>User Settings</h1>
      <Navbox divName={"user_container_navbox"} navItem={navItem} articleItem={articleItem}/>
    </section>
  )
}

export default User;
