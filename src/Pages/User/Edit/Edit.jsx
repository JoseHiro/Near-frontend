import React, {useState, useEffect} from 'react';
// import { useParams } from 'react-router-dom';
import { getAuthToken } from '../../../Auth/auth';
import PopUpMessage from '../../../Components/Popup-message/Popup-message';
import Input from '../../../Components/Input/Input';
import './edit.css';

const Edit = (props) =>{
  const [input, setinput] = useState({name: '', email: '', password: ''});
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [displayError, setDisplayError] = useState(false);

   useEffect(() =>{
    const token = getAuthToken();
    const fetchData = async () =>{
      const response = await fetch('http://localhost:8080/user/edit', {
        headers: {
          "Authoization" : "Bearer " + token
        }
      });
      const resData = await response.json();
      setinput(resData.user)
    }
    fetchData();
  },[])

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setinput(preValue => ({...preValue, [name]: value }))
  }

  const handleEditUser = async(e) =>{
    e.preventDefault();
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/user/edit', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        password: input.password
      })
    })

    const resData = await response.json();
    try {
      if(!response.ok){
        setError(resData.message);
        console.log(resData.message);
        setDisplayError(true);
        if(resData.errorFields){
          setErrorFields(resData.errorFields);
        }
        throw new Error(resData.message);
      }
      setinput({name: '', email: '', password: ''});

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
      errorMessage: "Use a valid email",
      className: errorFields.includes('email')? 'error' : '',
      pattern: "^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$",
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



  return (
    <section>
      {(displayError) && <PopUpMessage message={error}/>}
      <form className="common_form" onSubmit={handleEditUser}>
        { inputField.map(inputData => (
          <Input
            key={inputData.id}
            {...inputData}
            onChange={handleChange}
          />)
        )}
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Edit;
