import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Helpers/UserContext';
import post1 from '../backgroundimages/post4.jpeg';
import post2 from '../backgroundimages/post6.jpg';
import post3 from '../backgroundimages/post7.jpg';
import post4 from '../backgroundimages/post13.png';
import post5 from '../backgroundimages/post14.png';
import post6 from '../backgroundimages/post15.png';
import post7 from '../backgroundimages/post16.png';
import post8 from '../backgroundimages/post17.png';
import post9 from '../backgroundimages/post18.png';
import post10 from '../backgroundimages/post19.png';
import post11 from '../backgroundimages/post20.png';
import post12 from '../backgroundimages/post21.jpeg';
import post13 from '../backgroundimages/post22.jpeg';
import post14 from '../backgroundimages/post23.jpeg';
import post15 from '../backgroundimages/post24.png';
import post16 from '../backgroundimages/post25.jpeg';
import post17 from '../backgroundimages/post26.png';
import post18 from '../backgroundimages/post27.png';
import post19 from '../backgroundimages/post28.png';
import post20 from '../backgroundimages/post29.png';
import post21 from '../backgroundimages/post30.jpeg';
import post22 from '../backgroundimages/post31.jpeg';
import post23 from '../backgroundimages/post32.jpeg';
import post24 from '../backgroundimages/post33.jpeg';
import post25 from '../backgroundimages/post34.jpeg';
import post26 from '../backgroundimages/post35.png';
import post27 from '../backgroundimages/post36.jpeg';
import post28 from '../backgroundimages/post37.jpeg';




import '../css/Login.css';

const AppLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUserData } = React.useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const imagePaths = [
      post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13,post14,
      post15,post16,post17,post18,post19,post20,post21,post22,post23,post24,post25,post26,post27,post28
    ];

    const container = document.querySelector('.wrapper');
    const renderRandomImages = () => {
      for (let i = 0; i < 50; i++) {
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
    <div className="login-container">
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Log In</title>
      <link rel="stylesheet" href="style.css" />
      <div className="wrapper" style={{ zIndex: 10 }}>
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
