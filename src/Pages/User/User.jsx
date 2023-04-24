import React from 'react'
import { Link, useParams} from 'react-router-dom'
import './User.css'

const User = () =>{

  const {userId} = useParams();

  const editUrl = '/user/edit/' + userId;
  const paymentUrl = '/user/payment/' + userId;
  const deleteUrl = '/user/delete/' + userId;



  return (
    <section>
      <h1>User Settings</h1>
      <Link to={editUrl}>Edit</Link>
      <Link to={paymentUrl}>Payment</Link>
      <Link to={deleteUrl}>Delete</Link>
    </section>
  )
}

export default User;
