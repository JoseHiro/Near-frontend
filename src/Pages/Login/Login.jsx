import React, {useState, useContext} from 'react';
import { AuthContext } from '../../Context/auth-context';
import { useNavigate} from 'react-router-dom';
import PopUpMessage from '../../Components/Popup-message/Popup-message';
import Input from '../../Components/Input/Input';

function Login(){
  const [input, setInput] = useState({email: '', password:''})
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState([]);
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
        if(resData.errorFields){
          setErrorFields(resData.errorFields);
        }else{
          setErrorFields([]);
        }
        throw new Error('Validation failed.');
      }

      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId);
      localStorage.setItem('userName', resData.userName);

      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date( new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());

      await auth.login();

      navigate('/');
      setInput({email: '', password: ''});
      setErrorFields([]);

    } catch(error){
      setError(resData.message);
      setDisplayError(true);
      console.log(error);
    }
  }

  const inputField = [
    {
      id: 1,
      label: 'Email',
      type: "text",
      name: "email",
      value: input.email,
      errorMessage: "Use a valid email",
      className: errorFields.includes('email')? 'error' : '',
      pattern: "^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$",
    },
    {
      id:2,
      label: 'Password',
      type: "password",
      name: "password",
      value: input.password,
      className: errorFields.includes('password')? 'error' : '',
      errorMessage: "Password should be 8-20 characters that includes at least one 1 letter, 1 number and 1 special character",
      // pattern: `^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^*]{8,20}$`,
      pattern: `^[a-zA-Z0-9!@#$%^*]{6,20}$`,
    }
  ]

  return (
    <section>
      {(displayError) && <PopUpMessage message={error}/> }
      <form onSubmit={handlePostLogin}>
        { inputField.map(inputData => (
          <Input
            key={inputData.id}
            {...inputData}
            onChange={handleChange}
          />)
        )}
        <button className="" type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Login;
