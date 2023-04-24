import React from "react";
import { useParams, useNavigate} from "react-router-dom";
import './delete.css';


const Delete = (props) => {
  const {userId} = useParams();
  const navigate = useNavigate();

  console.log(userId);

  const handleDeleteUser = (e) =>{
    e.preventDefault();
    fetch('http://localhost:8080/user/delete/' + userId, {
      method: 'DELETE',
      // headers: {
      //   'Content-type': 'application/json'
      // },
    })
    .then(()=> {
      props.signOut();
    })
    .then(response =>{
      navigate('/');
    })
  }

  return (
    <section>
      <h3>Are you sure you want to delete your account?</h3>
      <button onClick={handleDeleteUser}>Delete</button>
    </section>
  )
}

export default Delete;
