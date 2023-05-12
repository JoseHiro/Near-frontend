import React, {useState} from "react";
import './geocode.css';
import {FiMapPin} from 'react-icons/fi'
import {useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const Geocode = (props) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GEOAPI,
    libraries: ['places']
  })

  const PlacesAutoComplete = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = ({description}) => () => {

      setValue(description, false);
      // setAddress(description);
      clearSuggestions();

      getGeocode({ address: description})
      .then((results) => {
        const {lat, lng} = getLatLng(results[0]);
        props.setLocation({name: description, lat: lat, lng:lng});
      })
    }

    const handleInput = (e) => {
      setValue(e.target.value);
    };

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li key={place_id} onClick={handleSelect(suggestion)} pointer="cursor">
            <FiMapPin className="pin"/><strong> {main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

    return <>
        <input value={(value)? value : props.location.name} onChange={handleInput} disabled={!ready} placeholder="Search a location"></input>
        { status === "OK" && <ul className="geocode_partial_match">{renderSuggestions()}</ul>}
    </>
  }


  if(!isLoaded) return <div>Not loaded yet...</div>
  return (
    <>
    <div className="places_container">
      <PlacesAutoComplete/>
    </div>
    </>
  )
}


export default Geocode;

// AIzaSyCBa1BZSAddCAYUQbDTMzcosNAxuW-Bxm0
