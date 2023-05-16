import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {searchPost} from '../../Search/search';
import SearchBar from "../../Components/Search-bar/Search-Bar";
import './posts.css';

const Posts = () =>{
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() =>{
    fetch('http://localhost:8080/posts')
    .then(response =>{
      return response.json();
    })
    .then(response =>{
      setPosts(response.posts)
    })
  },[])

  const handelSearch = async (e) => {
    e.preventDefault();
    const posts = await searchPost(keyword);
    setPosts(posts);
  }

  const handelInput = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <section id="posts_container">
      <SearchBar onSubmit={handelSearch} onChange={handelInput} value={keyword} placeholder="Search job name or category.."/>

      <div className="posts">
      { posts.map((post, index) => {
        return (
          <Link to={`/post/${post._id}`}>
            <article key={index} className="post">
              <img alt="" src={post.imageUrl}></img>
              <div className="post_info">
                <div className="post_price_star">
                  <h3>{post.title}</h3>
                  <p>{post.category}</p>
                </div>
                <div className="post_price_star">
                  <h3>{post.price} $</h3>
                  <h4>★★★★★</h4>
                </div>
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
