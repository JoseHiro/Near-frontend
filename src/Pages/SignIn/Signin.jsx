import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import PopUpMessage from '../../Components/Popup-message/Popup-message';
import './signin.css';

function Form(){
  const [input, setInput] = useState({ name: "", email: "", password:""});
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [displayError, setDisplayError] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setInput({...input, [name]: value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const response = await fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        password: input.password
      })
    })
    console.log(response);
    const resData = await response.json();

    try {
      if(!response.ok){
        setError(resData.message);
        if(resData.errorFields){
          setErrorFields(resData.errorFields);
        }
        setDisplayError(true);
        throw new Error(resData.message)
      }
      setDisplayError(false);
      setErrorFields([])
      setInput({name: "", email: "", password:""});
      nav('/login');
    } catch (error) {
      console.log(error);
    }
  }


  const inputField = [
    {
      id: 1,
      label: 'Name',
      type: "text",
      name: "name",
      value: input.name,
      errorMessage: "Please provide us your name",
      className: errorFields.includes('name')? 'error' : '',
      pattern: "^[A-Za-z]{3,20}",
    },
    {
      id:2,
      label: 'Email',
      type: "text",
      name: "email",
      value: input.email,
      className: errorFields.includes('email')? 'error' : '',
      errorMessage: "Password should be 8-20 characters that includes at least one 1 letter, 1 number and 1 special character",
      // pattern: `^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^*]{8,20}$`,
      pattern: `^[a-zA-Z0-9!@#$%^*]{6,20}$`,
    },
    {
      id:3,
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

  return(
    <section>
      {(displayError) && <PopUpMessage message={error}/>}
      <form className="container" onSubmit={handleSubmit}>
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

export default Form;
