import React, {useState} from 'react';
import { getAuthToken } from '../../../Auth/auth';
import Input from '../../../Components/Input/Input';
import PopUpMessage from '../../../Components/Popup-message/Popup-message';
import Geocode from '../../../Components/Geocode/Geocode';
import './post-job.css';

const PostJob = () => {

  const [input, setInput] = useState({ title: '', imageUrl: '', category: '', description: '', price : ''});
  const [location, setLocation] = useState({ name: '', lat: '', lng: ''})
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [displayError, setDisplayError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value})
  }

  const handelInput = async(e) => {
    e.preventDefault();
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/user/post-work/64444fa9459136cdef391833',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body :JSON.stringify({
        title: input.title,
        category: input.category,
        imageUrl: input.imageUrl,
        description: input.description,
        price: input.price,
        location: location
      })
    })

    const resData = await response.json();
    if(!response.ok){
      setError(resData.message);
      setDisplayError(true);
      console.log(resData.errorFields);
      if(resData.errorFields){
        setErrorFields(resData.errorFields);
      }
    }else{
      setError('');
      setDisplayError(false);
      setErrorFields([])
      setLocation({ name: '', lat: '', lng: ''});
      setInput({title: '', imageUrl: '', category: '', description: '', price : ''});
    }
  }

  const inputField = [
    {
      id: 1,
      label: 'Job title',
      type: "text",
      name: "title",
      value: input.title,
      placeholder: "Give a job title",
      errorMessage: "Please provide a title ",
      className: errorFields.includes('title')? 'error' : '',
      // pattern: "^[A-Za-z]{3,20}",
    },
    {
      id: 2,
      label: 'ImageUrl',
      type: "text",
      name: "imageUrl",
      value: input.imageUrl,
      placeholder: "Provide a image URL",
      errorMessage: "Please valid image URL",
      className: errorFields.includes('imageUrl')? 'error' : '',
      // pattern: "^[A-Za-z]{3,20}",
    },
    {
      id: 3,
      label: 'Work Description',
      type: "text",
      name: "description",
      value: input.description,
      placeholder: "Describe about the job",
      errorMessage: "Provide a descprition with more than 100 letters",
      className: errorFields.includes('description')? 'error' : '',
      // pattern: "^[A-Za-z0-9]{100,200}$",
    },
    {
      id: 4,
      label: 'Price',
      type: "number",
      name: "price",
      value: input.price,
      placeholder: "Price",
      className: errorFields.includes('price')? 'error' : '',
      errorMessage: "The price needs to more than 2",
      // pattern: `^[0-9]{2,10}$`,
    }
  ]

  return (
    <section id="post_job_container">
      <h2>Post your talent to save life</h2>
      {(displayError )&& <PopUpMessage message={error}/> }
      <form className="common_form" onSubmit={handelInput}>

        <label>Category</label>
        <select name="category" onChange={handleChange} value={input.category} className={errorFields.includes('imageUrl')? 'error' : ''} >
          <option value="">- Choose</option>
          <option value="art">Art</option>
          <option value="beauty">Beauty</option>
          <option value="cloth">Cloth</option>
          <option value="cooking">Cooking</option>
          <option value="dIY">DIY</option>
          <option value="dance">Dance</option>
          <option value="education">Education</option>
          <option value="repair">Repair</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="other">Other</option>
        </select>

        { inputField.map(inputData => (
          <Input
            key={inputData.id}
            {...inputData}
            onChange={handleChange}
          />)
        )}
        <label>Location</label>
        <Geocode location={location} setLocation={setLocation}/>

        <button type="submit">Submit</button>
      </form>
    </section>
  )
}


export default PostJob;
