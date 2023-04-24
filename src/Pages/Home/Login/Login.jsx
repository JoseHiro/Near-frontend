import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props){

  const [input, setInput] = useState({email: '', password:''})

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setInput(prevValue => { return {...prevValue, [name]: value }})
  }

  const navigate = useNavigate();

  const handleLogin = (e) =>{
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: input.email,
        password: input.password
      })
    }).then(response => {
      return response.json();
    })
    .then(resData =>{
      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
    })
    .then(() =>{
      props.login();
    })
    .then(() => {
      navigate('/');
      setInput({email: '', password: ''})
    })
  }


  return (
    <section>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="email" name="email" value={input.email} onChange={handleChange}></input>
        <label>Password</label>
        <input type="password" name="password" value={input.password} onChange={handleChange}></input>
        <button className="" type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Login;
