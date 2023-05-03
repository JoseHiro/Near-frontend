import React, {useState, useContext} from 'react';
import { AuthContext } from '../../Context/auth-context';
import { useNavigate} from 'react-router-dom';
import PopUpMessage from '../../Components/Popup-message/Popup-message';

function Login(){
  const [input, setInput] = useState({email: '', password:''})
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [displayError, setDisplayError] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setInput(prevValue => { return {...prevValue, [name]: value }})
  }

  const handlePostLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: input.email, password: input.password})
    })

    const resData = await response.json();

    try {
      if(!response.ok){
        if(resData.emptyFields){
          setEmptyFields(resData.emptyFields);
        }else{
          setEmptyFields([]);
        }
        throw new Error('Validation failed.');
      }

      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date( new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      await auth.login();
      navigate('/');
      setInput({email: '', password: ''})
      setEmptyFields([]);

    } catch(error){
      setError(resData.message);
      setDisplayError(true);
      console.log(error);
    }
  }

  return (
    <section>
      {(displayError) && <PopUpMessage message={error}/> }
      <form onSubmit={handlePostLogin}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          className={emptyFields.includes('email')? 'error' : ''}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          className={emptyFields.includes('password')? 'error' : ''}
        />
        <button className="" type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Login;
