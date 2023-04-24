import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'

const User = () =>{
  return (
    <section>
      <h1>User Settings</h1>
      <Link to="/user/:">Home</Link>
      <a href="/user/edit">Edit Account</a>
      <a href="/user/payment">Payment</a>
      <a href="/">Delete Account</a>
    </section>
  )
}

export default User;
