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
      <hr/>
      <div className="posts">
      { posts.map((post, index) => {
        return (
          <Link key={index} to={`/post/${post._id}`}>
            <article  className="post">
              <img alt="" src={post.imageUrl}></img>
              <div className="post_info">
                <div className="post_price_star">
                  <h4 className="post_title">{post.title}</h4>
                  <p>{post.category}</p>
                </div>
                <div className="post_price_star">
                  <h4>{post.price} $</h4>
                  <h5>★★★★★</h5>
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
