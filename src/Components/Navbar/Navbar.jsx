import React, {useContext} from 'react';
import { AuthContext } from '../../Context/auth-context';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) =>{
  const handleSignOut = (e) =>{
    e.preventDefault();
    auth.logout();
  }

  const auth = useContext(AuthContext);

  const userUrl = '/user/' + auth.userId;

  return (
    <div id='navbar'>
      <nav className="nav_links">
        <Link className="nav_title" to="/">Near</Link>
        { auth.isLoggedIn?
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
