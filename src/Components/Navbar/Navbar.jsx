import React, {useContext, useState, useEffect} from 'react';
import Burger from '../Burger/Burger';
import { AuthContext } from '../../Context/auth-context';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) =>{
  const [mobile, setMobile] = useState(false);


  useEffect(() =>{
    if(window.innerWidth < 700 ){
      setMobile(true)
    }
  },[])


  const handleSignOut = (e) =>{
    e.preventDefault();
    auth.logout();
  }

  const auth = useContext(AuthContext);

  const userUrl = '/user/' + auth.userId;

  return (
    <div id='navbar'>
      <nav className="navbar_left">
        <div>
          <Link className="nav_title" to="/">Near</Link>
        </div>
        <div className="navbar_contents">
          <Link to="/signin">Near works</Link>
          <Link to="/signin">Near categories</Link>
          <Link to="/signin">How to use</Link>
        </div>
      </nav>

      <nav className="navbar_right">
        { (auth.isLoggedIn && !mobile)?
          <div className="navbar_contents">
            <Link to="/signout" onClick={handleSignOut}>Signout</Link>
            <Link to={userUrl}>User</Link>
            <p>Hello User!</p>
          </div>
          :
          <div className="navbar_contents">
            <Link to="/signin">Signin</Link>
            <Link to="/login">Login</Link>
            <Burger/>
          </div>
        }
      </nav>
    </div>
  )
}

export default Navbar;
