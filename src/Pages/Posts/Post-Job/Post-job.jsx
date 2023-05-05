import React, {useState} from 'react';
import './post-job.css';

const PostJob = () => {

  const [input, setInput] = useState({ title: '', imageUrl: '', category: '', description: '', price : '' });
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
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
      if(resData.emptyFields){
        setEmptyFields(resData.emptyFields);
      }
    }

    setError('');
    setDisplayError(false);
    setInput({title: '', imageUrl: '', category: '', description: '', price : ''});
  }


  return (
    <section id="post_job_container">
      <h2>Post your talent to save life</h2>
      <form onSubmit={handelInput}>
        <label>Job title</label>
        <input type="text" name="title" onChange={handleChange} value={input.title}></input>
        <label>Category</label>
        <select name="category" onChange={handleChange} value={input.category}>
          <option value="">- Choose</option>
          <option value="Art">Art</option>
          <option value="Repair">Repair</option>
          <option value="Cloth">Cloth</option>
          <option value="Beauty">Beauty</option>
          <option value="Music">Music</option>
        </select>
        <label>Image URL</label>
        <input type="text" name="imageUrl" onChange={handleChange} value={input.imageUrl}></input>
        <label>Descripition</label>
        <textarea type="text" name="description" onChange={handleChange} value={input.description}></textarea>
        <label>Price</label>
        <input type="number" name="price" onChange={handleChange} value={input.price}></input>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}


export default PostJob;
