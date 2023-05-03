import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getAuthToken } from '../../../Auth/auth';
import './edit.css';

const Edit = (props) =>{
  const [userData, setUserData] = useState({name: '', email: '', password: ''});
  const {userId} = useParams();

   useEffect(() =>{
      fetch('http://localhost:8080/user/edit/' + userId)
      .then(res =>{
        return res.json();
      })
      .then(result =>{
        setUserData({name: result.name, email: result.email, password: result.password})
      })
  }, [])

  const handleInput = (e) =>{
    const {name, value} = e.target;
    setUserData(preValue => ({...preValue, [name]: value }))
  }

  const handleEditUser= (e) =>{
    e.preventDefault();
    const token = getAuthToken();
    fetch('http://localhost:8080/user/edit/' + userId, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password
      })
    })
    .then(response =>{
      return response.json();
    })
  }

  return (
    <section>
      <form onSubmit={handleEditUser}>
        <label>Name</label>
        <input type="text" name="name" value={userData.name} onChange={handleInput}></input>
        <label>Email</label>
        <input type="email" name="email" value={userData.email} onChange={handleInput}></input>
        <label>Password</label>
        <input type="password" name="password" value={userData.password} onChange={handleInput}></input>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Edit;
