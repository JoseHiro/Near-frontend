import React from "react";
import './popup-message.css';

const PopUpMessage = (props) =>{
  return (
    <>
      <div class="popup_message">
        <h3>{props.message}</h3>
      </div>
    </>
  )
}

export default PopUpMessage;
