import React from 'react';
import { useState } from 'react';
import axios from 'axios'; // Import Axios
import '../css/Login.css';

const Register = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    username: '',
  });

  // Function to handle changes in input fields and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      // Send a POST request to register the user
      const response = await axios.post('http://localhost:5000/user', formData);

      if (response.status === 201) {
        console.log('User registered successfully');
        console.log('User data:', response.data);
        // You can redirect the user or perform other actions here
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      {/* Meta tags for character set and viewport */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Title and CSS link */}
      <title>Register</title>
      <link rel="stylesheet" href="style.css" />

      {/* Form wrapper */}
      <div className="wrapper">
        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          {/* Input fields for first name, last name, email, password, and username */}
          <div className="input-box">
            <input
              type="text"
              placeholder="First Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">Register</button>
          <div className="register-link"><p>You already have an account? <a href="http://localhost:3000/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
