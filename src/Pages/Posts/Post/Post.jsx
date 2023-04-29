import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import './post.css';

const Post = () => {
  const [post, setPost] = useState([]);
  const {postId} = useParams();

  useEffect(() =>{
    fetch('http://localhost:8080/post/' + postId)
    .then(response =>{ return response.json();})
    .then(response =>{ setPost(response.post);})
  },[])

  return (
    <section id="post_container">
      <div className="post_head">
        <div>
          <h1>{post.title}</h1>
          <p>Poster</p>
        </div>
        <Link to="/">Edit</Link>
      </div>
      <div className="post_content">
        <img alt="" src={post.imageUrl}></img>
        <article>
          <div className="post_price_star">
            <h2>{post.price} $</h2>
            <h3>★★★★★</h3>
          </div>
          <Link>Check Feedbacks</Link>
          {/* <h3>{post.category}</h3> */}
          <div className="post_buttons">
            <button>Contact poster</button>
            <button>Reserve</button>
          </div>
        </article>
      </div>
      <div className="post_detail">
        <p>{post.description}</p>
      </div>
    </section>
  )
}

export default Post;
