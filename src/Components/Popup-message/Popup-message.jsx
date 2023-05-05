import React from "react";
import './popup-message.css';

const PopUpMessage = (props) =>{
  return (
    <>
      <div className="popup_message">
        <h3>{props.message}</h3>
      </div>
    </>
  )
}

export default PopUpMessage;
