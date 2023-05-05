import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PopUpMessage from '../../Components/Popup-message/Popup-message';
import './form.css'

function Form(){
  const [formValue, setFormValue] = useState({ name: "", email: "", password:""});
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [displayError, setDisplayError] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const response = await fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
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
      setFormValue({name: "", email: "", password:""});
      nav('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <section>
      {(displayError) && <PopUpMessage message={error}/>}
      <form className="container" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formValue.name}
          onChange={handleChange}
          className={errorFields.includes('name')? 'error' : ''}
          />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          className={errorFields.includes('email')? 'error' : ''}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          className={errorFields.includes('password')? 'error' : ''}
        />
        <button className="" type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Form;
