import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './posts.css';

const Posts = () =>{
  const [posts, setPosts] = useState([]);
  useEffect(() =>{
    fetch('http://localhost:8080/posts')
    .then(response =>{
      return response.json();
    })
    .then(response =>{
      setPosts(response.posts)
    })
  },[])

  return (
    <section id="posts_container">
      <div className="posts">
      { posts.map((post, index) => {
        return (
          <Link to={`/post/${post._id}`}>
            <article key={index} className="post">
              <img alt="" src={post.imageUrl}></img>
              <div className="post_info">
                <div className="post_price_star">
                  <h3>{post.title}</h3>
                  <h3>{post.price} $</h3>
                  <h4>★★★★★</h4>
                </div>
                  <p>{post.category}</p>
              </div>
            </article>
          </Link>
        )
      })}
      </div>
    </section>
  )
}

export default Posts;
