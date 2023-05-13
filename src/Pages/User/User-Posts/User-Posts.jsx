import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../../Auth/auth'
import './user-post.css'

function UserPosts() {
  const [postsExist, setPostsExist] = useState(false);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserPosts = async () => {
      const token = getAuthToken()
      let response = await fetch('http://localhost:8080/user/posts', {
        headers: {
          "Authorization" : "Bearer " + token
        }
      })
      const resData = await response.json();

      if(resData.posts){
        setPosts(resData.posts);
        setPostsExist(true)
      }else{
        setPosts([]);
        setPostsExist(false)
      }
    }
    getUserPosts();
  }, [])

  const handleDelete = async (e) => {
    e.preventDefault();

    const deletePost = e.target.id;
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/post/delete', {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + token
      },
      body: JSON.stringify({
        postId: deletePost
      })
    })

    if(!response.ok){
      console.log("Something went wrong");
    }else{
      navigate('/user');
    }
  }

  if(!postsExist) return <h3>No posts</h3>
  return (
    <>
      {posts.map((post, index) => {
        return <Link key={index} to={`/post/${post._id}`}>
        <article className='user_post'>
          <img alt='' src={post.imageUrl}></img>
          <div className="user_post_item">
            <div>
              <h4>{post.title}</h4>
              <p>{post.price} $</p>
            </div>
            <div>
              <button><Link to={`/post/edit/${post._id}`}>Edit</Link></button>
              <button id={post._id} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </article>
        </Link>
      })}
    </>
  )
}

export default UserPosts
