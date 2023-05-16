import React, {useState} from 'react'
import {searchPost} from '../../Search/search';
import {BsSearch} from 'react-icons/bs';
import './search-bar.css';

function SearchBar(props) {
  // const [keyword, setKeyword] = useState('');
  const {onSubmit, onChange, ...inputProps} = props

  return (
    <>
      <form className="search_engine_form" onSubmit={onSubmit}>
        <input {...inputProps} onChange={onChange}></input>
        <button type="submit"><BsSearch/></button>
      </form>
    </>
  )
}

export default SearchBar
