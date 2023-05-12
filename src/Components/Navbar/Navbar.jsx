import React, {useContext} from 'react';
import Burger from '../Burger/Burger';
import { AuthContext } from '../../Context/auth-context';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () =>{

  const auth = useContext(AuthContext);

  const handleSignOut = (e) =>{
    e.preventDefault();
    auth.logout();
  }

  const userUrl = '/user/' + auth.userId;

  return (
    <div id='navbar'>
      <nav className="navbar_left">
        <div>
          <Link className="nav_title" to="/">Near</Link>
        </div>
        <div className="navbar_contents">
          <Link to="/posts">Near works</Link>
          <Link to="/user/post-job">Work for society</Link>
          {/* <Link to="/signin">Near categories</Link> */}
          {/* <Link to="/signin">How to use</Link> */}
        </div>
      </nav>

      <nav className="navbar_right">
        { auth.isLoggedIn?
          <div className="navbar_contents">
            <Link to="/signout" onClick={handleSignOut}>Signout</Link>
            <Link to={userUrl}>User</Link>
            <p>Hello {auth.userName}!</p>
          </div>
          :
          <div className="navbar_contents">
            <Link to="/signin">Signin</Link>
            <Link to="/login">Login</Link>
          </div>
        }
      <Burger/>
      </nav>
    </div>
  )
}

export default Navbar;
