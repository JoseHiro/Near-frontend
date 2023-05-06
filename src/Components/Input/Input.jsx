import React from "react";
import './input.css';

const Input = (props) => {
  const {label, erorrMesage, onChange, errorMessage, ...inputProps} = props;
  return (
    <>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
      />
      <span>{errorMessage}</span>
    </>
  )
}

export default Input;
