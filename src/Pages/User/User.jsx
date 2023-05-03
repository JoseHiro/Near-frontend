import React from 'react';
import { Link, useParams} from 'react-router-dom';
import Navbox from '../../Components/Navbox/Navbox';
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

  const editUrl = '/user/edit/' + userId;
  const paymentUrl = '/user/payment/' + userId;
  const deleteUrl = '/user/delete/' + userId;

  const articleItem = [
    <><h1>Profile</h1></>,
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
