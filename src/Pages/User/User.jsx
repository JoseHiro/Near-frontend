import React from 'react'
import { Link, useParams} from 'react-router-dom'
import Navbox from '../../Components/Navbox/Navbox'
import './User.css'

const User = () =>{

  const {userId} = useParams();
  const editUrl = '/user/edit/' + userId;
  const paymentUrl = '/user/payment/' + userId;
  const deleteUrl = '/user/delete/' + userId;

  return (
    <section id="user_container">
      <h1>User Settings</h1>
      <div>
        <nav className='user_container_actions'>
        <Navbox/>
          <Link to={editUrl}>Edit</Link>
          <Link to={paymentUrl}>Payment</Link>
          <Link to={deleteUrl}>Delete</Link>
        </nav>
      </div>
      <div>

      </div>
    </section>
  )
}

export default User;
