import React, {useState, useEffect } from 'react';
import './edit.css';

const Edit = (props) =>{
  const [userData, setUserDate] = useState({name: '', email: '', password: ''});

   useEffect(() =>{
      fetch('http://localhost:8080/user/edit/' + props.userId)
      .then(res =>{
        console.log(res);
        return res.json();
      })
      .then(result =>{
        console.log(result);
      })

  }, [])

  return (
    <section>
      <form >
        <label>Name</label>
        <input type="email" name="email" placeholder=''></input>
        <label>Email</label>
        <input type="email" name="email" placeholder=''></input>
        <label>Password</label>
        <input type="password" name="password"></input>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Edit;
