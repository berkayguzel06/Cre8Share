import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Do something with the username, e.g., display it
    console.log('Username from URL parameters:', username);
  }, [username]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send password data to the server using axios
    axios.post('http://localhost:5000/forgotpassword/reset', { password, username })
      .then(response => {
        console.log("Password reset successful:", response.data);

        // Show alert to the user
        alert('Password reset successful!');

        // Redirect to the login page
        navigate('/login');
      })
      .catch(error => {
        console.error('Error resetting password:', error);
        // Handle error, display a message, or navigate to an error page if needed
      });
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Password</title>
      <link rel="stylesheet" href="style.css" />
      <div className="wrapper">
        <form onSubmit={handleFormSubmit}>
          <h1>Reset Password</h1>
          <div className="input-box">
            {/* Use controlled component pattern for input */}
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn">Set New Password</button>
          <div className="register-link">
            <p><a href="http://localhost:3000/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
