import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import Textarea from '../../../Components/Textarea/Textarea'
import { getAuthToken } from '../../../Auth/auth';
import Input from '../../../Components/Input/Input';

const EditProfile = () => {
  const [input, setinput] = useState({profile: '', experience: ''});
  // const [error, setError] = useState('');
  // const [errorFields, setErrorFields] = useState([]);
  // const [displayError, setDisplayError] = useState(false);
  const {userId} = useParams();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setinput(preValue => ({...preValue, [name]: value }))
  }

  const handleEditUser = async (e) =>{
    e.preventDefault();
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/user/edit-profile/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        profile: input.profile,
        experience: input.experience
      })
    })
  }

  const inputField = [
    {
      id: 1,
      label: 'Profile',
      type: "text",
      name: "profile",
      value: input.profile,
      // errorMessage: "Please provide us your name",
      // className: errorFields.includes('name')? 'error' : '',
      // pattern: "^[A-Za-z]{3,20}",
    },
    {
      id:2,
      label: 'Email',
      type: "text",
      name: "experience",
      value: input.experience,
      // errorMessage: "Use a valid email",
      // className: errorFields.includes('email')? 'error' : '',
      // pattern: "^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$",
    },
  ]

    return (
      <form onSubmit={handleEditUser}>
        <Input type={"file"} label={"Profile image"}/>
        { inputField.map(inputData => (
          <Textarea
            key={inputData.id}
            {...inputData}
            onChange={handleChange}
          />)
        )}
        <button type="submit">Submit</button>
      </form>
    )
}

export default EditProfile
