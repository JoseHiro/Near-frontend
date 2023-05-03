import React, {useState} from "react";
import './navbox.css';

const Navbox = (props) =>{
  const [pickedNav, setNav] = useState(0);

  const handleClick = (e) =>{
    const displayArticle = e.currentTarget.id;
    setNav(displayArticle);
  }

  return (
    <>
      <div className={`navbox ${props.divName}`}>
        <nav>
          {props.navItem.map((element, index) => {
            return(
            <div onClick={handleClick} key={index} id={index} style={{cursor:'pointer'}} className="navbox_nav">
              <h3>{element.icon}</h3>
              <h3>{element.title}</h3>
            </div>)
          })}
        </nav>
        <article>
          {props.articleItem[pickedNav]}
        </article>
      </div>
    </>
  )
}


export default Navbox;
