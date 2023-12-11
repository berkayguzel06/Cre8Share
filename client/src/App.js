import './App.css';
import axios from 'axios';
import React, { useEffect } from 'react';

function App() {
  // useEffect hook is used to perform side effects in function components
  useEffect(() => {
    // Axios is used to make an HTTP GET request to 'http://127.0.0.1:5000/Posts'
    axios.get('http://127.0.0.1:5000/Posts').then((response) => {
      // Log the data received from the server to the console
      console.log(response.data);
    });
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  // Render an empty div with the 'App' class
  return (
    <div className="App"></div>
  );
}

export default App;