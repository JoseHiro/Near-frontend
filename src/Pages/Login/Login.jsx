import React, {useState, useContext} from 'react';
import { AuthContext } from '../../Context/auth-context';
import { useNavigate} from 'react-router-dom';

function Login(props){
  const [input, setInput] = useState({email: '', password:''})
  // const [emptyFields, setEmptyFields] = useState([]);
  const auth = useContext(AuthContext);

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setInput(prevValue => { return {...prevValue, [name]: value }})
  }

  const navigate = useNavigate();
  // console.log(emptyFields);

  const handlePostLogin = (e) =>{
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: input.email, password: input.password})
    }).then(response => {
      console.log(response);
      if(response.status !== 200){
        // setEmptyFields()
        throw new Error('Validation failed.');
      }
       return response.json();
    })
    .then(res =>{
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId);
      auth.login(res.token, res.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date( new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
    })
    .then(()=>{
      auth.login();
      navigate('/');
      setInput({email: '', password: ''})
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <section>
      <form onSubmit={handlePostLogin}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          // className={emptyFields.includes('email')? 'error' : ''}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          // className={emptyFields.includes('password')? 'error' : ''}
        />
        <button className="" type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Login;
