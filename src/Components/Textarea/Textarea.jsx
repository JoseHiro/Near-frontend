import React from "react";
import './textarea.css';

const Textarea = (props) => {
  const {label, erorrMesage, onChange, errorMessage, ...inputProps} = props;
  return (
    <>
      <label>{label}</label>
      <textarea
        {...inputProps}
        onChange={onChange}
      />
      <span>{errorMessage}</span>
    </>
  )
}

export default Textarea;
