import React, {useContext, useState} from 'react'
import { AuthContext } from '../../Context/auth-context';
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineClose} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SidebarData } from './Sidebardata';
import './burger.css';
// import { BiLogIn } from 'react-icons/bi';

function Burger() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const auth = useContext(AuthContext);

  const display = (cName) => {
    if(auth.isLoggedIn){
     if(cName.includes("sidenav_before_login")) return true;
    }else{
     if(cName.includes("sidenav_logged_in")) return true;
    }
    return false;
  }

  const handleSignOut = (e) =>{
    e.preventDefault();
    auth.logout();
  }

  return (
    <>
      <div className="burger_bars">
        <RxHamburgerMenu onClick={showSidebar}/>
      </div>
      <nav className={sidebar ? 'nav_menu active' : 'nav_menu'}>
        <ul className='nav_menu_items'>
          <li className='navbar_toggle'>
            <Link to="#" className='menu_bars'>
              <AiOutlineClose onClick={showSidebar}/>
            </Link>
          </li>
          {
            SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={item.title === 'Signout' && {handleSignOut}}
                  style={{display: (display(item.cName)) && 'none'}}>
                    {console.log((auth.isLoggedIn )&& (item.cName.includes("sidenav_logged_in")))}
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </>
  )
}

export default Burger


// {(auth.isLoggedIn &&)? }
