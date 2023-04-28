import React, {useState} from 'react';
import './post-job.css';

const PostJob = () => {

  const [input, setInput] = useState({title: '', imageUrl: '', category: '', description: '', price : ''})
  console.log(input);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value})
  }

  const handelInput = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/user/post-work/64444fa9459136cdef391833',{
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
    }).then(response =>{
      console.log(response);
      return response.json();
    })
    setInput({title: '', imageUrl: '', category: '', description: '', price : ''});
  }


  return (
    <section id="post_job_container">
      <h2>Post your talent to save life</h2>
      <form onSubmit={handelInput}>
        <label>Job title</label>
        <input type="text" name="title" onChange={handleChange} value={input.title}></input>
        <label>Category</label>
        <input type="text" name="category" onChange={handleChange} value={input.category}></input>
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
