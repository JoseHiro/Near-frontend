import React from 'react';
import './body.css';

const Body = () =>{
  return (
    <section id="body_container">
      <h2>Benefits</h2>
      <div className="body_explanation_container">
        <article>
          <h3>Find telented neighbors</h3>
          <h3>Life savers arrives fast</h3>
        </article>
        <article>
          <h3>Agencies absorve huge money from us</h3>
          <h3>Product fee, commission, insurance ..etc</h3>
        </article>
        <article>
          <h3>You get fast and sophisticated skills</h3>
          <h3>Read feedbacks from your interests</h3>
        </article>
        <article>
          <h3>Cheaper, better and faster</h3>
          <h3>What do you need more?</h3>
        </article>
        <article>
          <h3>Situation 1</h3>
          {/* <h3>Read feedbacks from your interests</h3> */}
        </article>
        <article>
          <h3>Situation 2</h3>
          {/* <h3>What do you need more?</h3> */}
        </article>
      </div>
    </section>
  )
}

export default Body;
