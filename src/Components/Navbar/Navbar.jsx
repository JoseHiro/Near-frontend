import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) =>{
  const handleSignOut = (e) =>{
    e.preventDefault();
    props.signOut();
  }

  const userUrl = '/user/' + props.userId;

  return (
    <div id='navbar'>
      <nav className="nav_links">
        <Link className="nav_title" to="/">Near</Link>
        { props.isLoggedIn?
          <>
            <Link to="/signout" onClick={handleSignOut}>Signout</Link>
            <Link to={userUrl}>User</Link>
            <p>Hello User!</p>
          </>
          :
          <>
            <Link to="/signin">Signin</Link>
            <Link to="/login">Login</Link>
          </>
        }
      </nav>
    </div>
  )
}

export default Navbar;
