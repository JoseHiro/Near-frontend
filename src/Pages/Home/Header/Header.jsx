import React from "react";
import { Link } from "react-router-dom";
import {MdWork} from 'react-icons/md';
import {BsSearch} from 'react-icons/bs';
import {BiCategoryAlt} from 'react-icons/bi';
import Navbox from "../../../Components/Navbox/Navbox";
import './header.css';

const Header = () => {
  const navItem = [
    { icon: <MdWork/>, title: "Share work"},
    { icon: <BsSearch/>, title: "Search help"},
    { icon: <BiCategoryAlt/>, title: "Job categories"},
  ]

  const articleItem = [
    <>
      <h1>Provide your skills to public</h1>
      <h3>Earn some income</h3>
      <div>
        <button>
          <Link to='/user/post-job'>Contribute</Link>
        </button>
        <button>
          <Link to='/posts'>See others</Link>
        </button>
      </div>
    </>,
    <>
      <h1>Search your needs</h1>
      <form className="home_header_form">
        <input type="text" name="searchKeyword" placeholder="...Search work"/>
        <button><BsSearch/></button>
      </form>
    </>,
    <>
      <h1>See categories</h1>
      <h3>Earn some income</h3>
    </>
  ]

  return (
    <section id="home_header_section">
      <Navbox divName={"home_header_nav_container"} navClass={"header_nav"} navItem={navItem} articleItem={articleItem}/>
      <div className="home_header_nav_container">
      </div>
    </section>
  )
}


export default Header;
