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
        <Link to="/">Home</Link>
        { props.isLoggedIn?
          <>
            <Link to="/signout" onClick={handleSignOut}>Signout</Link>
            <Link to={userUrl}>User</Link>
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
