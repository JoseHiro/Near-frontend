import React, {useEffect, useState} from 'react';
import Form from './Form';


function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:8080/api")
    .then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  },[])

  return (
    <div className="App">
      <Form></Form>
    </div>
  );
}

export default App;
