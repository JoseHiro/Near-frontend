import React from 'react';
import './Navbar.css';

const Navbar = (props) =>{

  const handleSignOut = (e) =>{
    e.preventDefault();
    props.signOut();
  }

  return (
    <div id='navbar'>
      <nav className="nav_links">
        <a href="/">Home</a>
        { props.isLoggedIn?
          <a href="/signout" onClick={handleSignOut}>Signout</a>
          :
          <>
          <a href="/signin">Signin</a>
          <a href="/login">Login</a>
          </>
        }

        <a href="/user">User</a>
      </nav>
    </div>
  )
}

export default Navbar;
