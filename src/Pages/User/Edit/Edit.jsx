import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getAuthToken } from '../../../Auth/auth';
import PopUpMessage from '../../../Components/Popup-message/Popup-message';
import './edit.css';

const Edit = (props) =>{
  const [userData, setUserData] = useState({name: '', email: '', password: ''});
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [displayError, setDisplayError] = useState(false);
  const {userId} = useParams();

   useEffect(() =>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost:8080/user/edit/' + userId);
      const resData = await response.json();
      setUserData({name: resData.name, email: resData.email, password: resData.password})
    }
    fetchData();
  }, [])

  const handleInput = (e) =>{
    const {name, value} = e.target;
    setUserData(preValue => ({...preValue, [name]: value }))
  }

  const handleEditUser = async(e) =>{
    e.preventDefault();
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/user/edit/' + userId, {
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

    const resData = await response.json();
    try {
      if(!response.ok){
        setError(resData.message);
        console.log(resData.message);
        setDisplayError(true);
        if(resData.emptyFields){
          console.log('empyu');
          setEmptyFields(resData.emptyFields);
        }
        throw new Error(resData.message);
      }
      setUserData({name: '', email: '', password: ''});

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      {(displayError) && <PopUpMessage message={error}/>}
      <form onSubmit={handleEditUser}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInput}
          className={emptyFields.includes('name')? 'error' : ''}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInput}
          className={emptyFields.includes('email')? 'error' : ''}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInput}
          className={emptyFields.includes('password')? 'error' : ''}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Edit;
