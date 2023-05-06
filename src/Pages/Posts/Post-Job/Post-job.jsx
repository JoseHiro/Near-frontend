import React, {useState} from 'react';
import Input from '../../../Components/Input/Input';
import PopUpMessage from '../../../Components/Popup-message/Popup-message';
import './post-job.css';

const PostJob = () => {

  const [input, setInput] = useState({ title: '', imageUrl: '', category: '', description: '', price : '' });
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [displayError, setDisplayError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value})
  }

  const handelInput = async(e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/user/post-work/64444fa9459136cdef391833',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body :JSON.stringify({
        title: input.title,
        category: input.category,
        imageUrl: input.imageUrl,
        description: input.description,
        price: input.price
      })
    })

    const resData = await response.json();
    if(!response.ok){
      setError(resData.message);
      setDisplayError(true);
      console.log(resData.errorFields);
      if(resData.errorFields){
        console.log("hello");
        setErrorFields(resData.errorFields);
      }
    }else{
      setError('');
      setDisplayError(false);
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
      errorMessage: "Please provide a title ",
      className: errorFields.includes('title')? 'error' : '',
      // pattern: "^[A-Za-z]{3,20}",
    },
    {
      id: 2,
      label: 'ImageUrl',
      type: "text",
      name: "imadgeUrl",
      value: input.imageUrl,
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
      errorMessage: "Provide a descprition with more than 100 letters",
      className: errorFields.includes('description')? 'error' : '',
      // pattern: "^[A-Za-z0-9]{100,200}$",
    },
    {
      id: 4,
      label: 'Price',
      type: "number",
      name: "price",
      value: input.password,
      className: errorFields.includes('price')? 'error' : '',
      errorMessage: "The price needs to more than 2",
      // pattern: `^[0-9]{2,10}$`,
    }
  ]

  return (
    <section id="post_job_container">
      <h2>Post your talent to save life</h2>
      {(displayError )&& <PopUpMessage message={error}/> }
      <form onSubmit={handelInput}>

        <label>Category</label>
        <select name="category" onChange={handleChange} value={input.category} className={errorFields.includes('imageUrl')? 'error' : ''} >
          <option value="">- Choose</option>
          <option value="Art">Art</option>
          <option value="Repair">Repair</option>
          <option value="Cloth">Cloth</option>
          <option value="Beauty">Beauty</option>
          <option value="Music">Music</option>
          <option value="Music">Education</option>
          <option value="Music">DIY</option>
        </select>

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


export default PostJob;
