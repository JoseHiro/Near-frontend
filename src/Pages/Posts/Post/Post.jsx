import React, {useState, useEffect} from 'react';
import { getAuthToken } from '../../../Auth/auth';
import { useParams, Link } from 'react-router-dom';
import './post.css';

const Post = () => {
  const [post, setPost] = useState([]);
  const {postId} = useParams();

  useEffect(() =>{
    const token = getAuthToken();
    fetch('http://localhost:8080/post/' + postId, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response =>{ return response.json();})
    .then(response =>{ setPost(response.post);})
  },[])

  return (
    <section id="post_container">
      <div className="post_head">
        <div>
          <h1>{post.title}</h1>
          <div className="post_head_user">
            <img alt="" src="https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/no-profile-picture-icon.png"></img>
            <Link><p>{post.poster}</p></Link>
          </div>
        </div>
        <Link href={'/post/edit/' + postId}>Edit</Link>
      </div>
      <div className="post_content">
        <img alt="" src={post.imageUrl}></img>
        <article>
          <div className="post_price_star">
            <h2>{post.price} $</h2>
            <h3>★★★★★</h3>
          </div>
          <a href="#post_reviews">Check Feedbacks</a>
          <h3>{post.category}</h3>
          <div className="post_buttons">
            <Link to={'/chat/' + post.posterId}><button>Contact poster</button></Link>
            <button>Reserve</button>
          </div>
        </article>
      </div>

      <div className="post_detail">
        <hr/>
        <h3 className="post_description_title">About this job</h3>
        <p>{post.description}</p>
      </div>

      <div id="post_reviews" className="post_reviews">
        <hr/>
        <h3 className="post_description_title">Reviews</h3>
        <div className="post_reviews_container">
          <article>
            <h4>Review1</h4>
            <p>"Lorem ipsum dolor sit amet, consecniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proid"</p>
          </article>
          <article>
            <h4>Review1</h4>
            <p>"Lorem ipsum dolor sit amet, consecniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proid"</p>
          </article>
          <article>
            <h4>Review1</h4>
            <p>"Lorem ipsum dolor sit amet, consecniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proid"</p>
          </article>
        </div>
      </div>

    </section>
  )
}

export default Post;
