import React, {useState} from 'react'
// import {FaBars} from 'react-icons/fa'
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineClose} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SidebarData } from './Sidebardata';
import './burger.css';

function Burger() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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
                <li key={index} className={item.cName}>
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
