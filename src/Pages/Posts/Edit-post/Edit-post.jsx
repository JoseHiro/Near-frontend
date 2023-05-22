import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PopUpMessage from '../../../Components/Popup-message/Popup-message';
import Input from '../../../Components/Input/Input';
import Textarea from '../../../Components/Textarea/Textarea';
// import './edit-post.css';

const EditJob = () => {
  const [input, setInput] = useState({title: '', imageUrl: '', category: '', description: '', price : ''});
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [displayError, setDisplayError] = useState(false);

  const {postId} = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value})
  }

  useEffect(() =>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost:8080/post/edit/' + postId);
      const resData = await response.json();
      setInput(resData.post)
    }
    fetchData();
},[])


  const handelInput = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/post/edit/' + postId,{
      method: "PUT",
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

    try {
      if(!response.ok){
        setError(setError(resData));
        setDisplayError(true);
        if(resData.errorFields){
          setErrorFields(resData.errorFields);
        }
      }else{
        setError('');
        setErrorFields([]);
        setDisplayError(false);
      }

    } catch (error) {

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
      pattern: "^[A-Za-z]{3,20}",
    },
    {
      id: 2,
      label: 'ImageUrl',
      type: "text",
      name: "imageUrl",
      value: input.imageUrl,
      errorMessage: "Please valid image URL",
      className: errorFields.includes('imageUrl')? 'error' : '',
      // pattern: "^[A-Za-z]{3,20}",
    },
    {
      id: 3,
      label: 'Price',
      type: "number",
      name: "price",
      value: input.price,
      className: errorFields.includes('price')? 'error' : '',
      errorMessage: "The price needs to more than 2",
      // pattern: `^[0-9]{2,10}$`,
    }
  ]

  const textAreaField = [
    {
      id: 1,
      label: 'Work Description',
      type: "text",
      name: "description",
      value: input.description,
      errorMessage: "Provide a descprition with more than 100 letters",
      className: errorFields.includes('description')? 'error' : '',
      pattern: "^[A-Za-z0-9]{100,200}$",
    },
  ]


  return (
    <section id="post_job_container">
      <h2>Edit your post</h2>
      {(displayError )&& <PopUpMessage message={error}/> }

      <form className="common_form" onSubmit={handelInput}>
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

        <Textarea {...textAreaField[0]} onChange={handleChange}/>

        <button type="submit">Submit</button>
      </form>
    </section>
  )
}


export default EditJob;
