import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './edit-post.css';

const EditJob = () => {

  const [input, setInput] = useState({title: '', imageUrl: '', category: '', description: '', price : ''})
  const {postId} = useParams();

  // console.log(input);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value})
  }

  useEffect(() =>{
    fetch('http://localhost:8080/post/edit/' + postId)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setInput({
        title: data.post.title,
        imageUrl: data.post.imageUrl,
        category: data.post.category,
        description: data.post.description,
        price: data.post.price
      })
    })
},[])


  const handelEditInput = async (e) => {
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
  }


  return (
    <section id="post_job_container">
      <h2>Edit your post</h2>
      <form onSubmit={handelEditInput}>
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


export default EditJob;
