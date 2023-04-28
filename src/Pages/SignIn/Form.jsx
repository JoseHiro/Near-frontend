import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css'

function Form(){
  const [formValue, setFormValue] = useState({ name: "", email: "", password:""})
  const nav = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      })
    }).then(response => {
      console.log(response);
      return response.json();
    })
    setFormValue({name: "", email: "", password:""});
    nav('/login');
  }

  return(
    <section>
      <form className="container" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formValue.name} onChange={handleChange}></input>
        <label>Email</label>
        <input type="email" name="email" value={formValue.email} onChange={handleChange}></input>
        <label>Password</label>
        <input type="password" name="password" value={formValue.password} onChange={handleChange}></input>
        <button className="" type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Form;
