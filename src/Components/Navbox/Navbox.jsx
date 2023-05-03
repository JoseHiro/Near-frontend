import React, {useState} from "react";
import { Link } from "react-router-dom";
import './navbox.css';

import {MdWork} from 'react-icons/md';
import {BsSearch} from 'react-icons/bs';
import {BiCategoryAlt} from 'react-icons/bi';

const Navbox = () =>{
  const [pickedNav, setNav] = useState(0);
  const navItem = [
    { title: "User informatioin"},
    { title: "Payements"},
    { title: "Delete"},
  ]

  const articleItem = [
    <>
      <h1>Page 1</h1>
    </>,
    <>
      <h1>Page 2</h1>
    </>,
    <>
      <h1>Page 3</h1>
    </>
  ]

  const handleClick = (e) =>{
    const displayArticle = e.currentTarget.id;
    setNav(displayArticle);
  }

  return (
    <>
      <div className="navbox">
        <nav>
          {navItem.map((element, index) => {
            return(
            <div onClick={handleClick} key={index} id={index} style={{cursor:'pointer'}} className="header_nav">
              {/* <h3>{element.icon}</h3> */}
              <h3>{element.title}</h3>
            </div>)
          })}
        </nav>
        <article>
          {articleItem[pickedNav]}
        </article>
      </div>
    </>
  )
}


export default Navbox;
