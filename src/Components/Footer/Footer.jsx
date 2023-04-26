import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () =>{
  return (
    <footer>
      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to="/">Search</Link>
        </div>
        <div>
          <Link to="/">Contact</Link>
          <Link to="/">Help</Link>
        </div>
        <div>
          <Link to="/">Feedback</Link>
          <Link to="/">About</Link>
        </div>
      </nav>
      <p>Near©️</p>
    </footer>
  )
}

export default Footer;
