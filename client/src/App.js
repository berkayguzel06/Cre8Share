import './App.css';
import axios from 'axios';
import React, {useEffect } from 'react';


function App() {
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/Posts').then((response)=>{
      console.log(response.data);
    });
  }, []);
  return (
    <div className="App"></div>
  );
}

export default App;
