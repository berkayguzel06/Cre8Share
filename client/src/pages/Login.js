import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Helpers/UserContext';
import post1 from '../backgroundimages/post3.jpeg';
import post2 from '../backgroundimages/post4.jpeg';
import post3 from '../backgroundimages/post5.jpg';
import post4 from '../backgroundimages/post6.jpg';
import post5 from '../backgroundimages/post7.jpg';
import post6 from '../backgroundimages/post8.jpg';
import post7 from '../backgroundimages/post9.jpg';
import post8 from '../backgroundimages/post10.jpg';
import post9 from '../backgroundimages/post11.jpg';
import post10 from '../backgroundimages/post12.jpg';
import '../css/Login.css';

const AppLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUserData } = React.useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const imagePaths = [
      post1, post2, post3, post4, post5, post6, post7, post8, post9, post10
    ];

    const container = document.querySelector('.wrapper');
    const renderRandomImages = () => {
      for (let i = 0; i < 10; i++) {
        const img = document.createElement('img');
        img.src = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        container.appendChild(img);

        // Rastgele başlangıç pozisyonları
        const startX = Math.random() * -700;
        const startY = Math.random() * 500;
        const startz = Math.random() * 500;
        const startq = Math.random() * 500;

        img.style.top = `${startY}px`;
        img.style.left = `${startX}px`;
        img.style.right = `${startz}px`;
        img.style.bottom = `${startq}px`;

        // Rastgele animasyon süreleri ve mesafeler
        const endX = Math.random() * 900;
        const endY = Math.random() * 600;
        const distanceX = Math.abs(endX - startX);
        const distanceY = Math.abs(endY - startY);

        img.style.animation = `moveImage ${Math.random() * 100 + 5}s infinite alternate linear`;
        img.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
      }
    };

    renderRandomImages();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:5000/user/login', loginData);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUserData({
          username: response.data.username,
          token: response.data.token,
          id: response.data.id,
        });
        console.log(response.data);
        localStorage.setItem('accessToken', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Hataları uygun şekilde işleyin
    }
  };

  return (
    <div class="login-container">
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Log In</title>
      <link rel="stylesheet" href="style.css" />
      <div className="wrapper" style={{ zIndex: '10' }}>
        <form>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Remember Me
            </label>
            <a href="http://localhost:3000/forgotpassword">Forgot Password</a>
          </div>
          <button type="submit" className="btn" onClick={login}>
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <a href="http://localhost:3000/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppLogin;
