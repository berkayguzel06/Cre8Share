import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/Home.css';

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/post',
    { // Add the token to the request headers before calling axios.get.
      headers:{accessToken:sessionStorage.getItem("accessToken")}
    })  // Assuming you're using GET to retrieve posts
      .then(response => {
        console.log('Response:', response.data);
        console.log('Token:', sessionStorage.getItem("accessToken"));
        // Ensure that the response.data is an array before calling setListOfPosts
        if (Array.isArray(response.data)) {
          setListOfPosts(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Function to convert binary data to base64
  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  // Function to format the time difference
  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hoursAgo} hours ago`;
  };

  const navigate = useNavigate();

  const navigateLogin = () => {
    // navigate to /login
    navigate('/login');
  };

  const navigateRegister = () => {
    // navigate to /register
    navigate('/register');
  };
  
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home</title>
      <link rel="stylesheet" href="style.css" />
      <div className="wrapper">
        <form action="">
          {/* Display the latest posts */}
          <div>
            <h2>Latest Posts</h2>
            {listOfPosts.length > 0 ? (
    <ul>
        {listOfPosts.map(post => (
            <li key={post.id}>
                {/* Display user's name instead of user ID */}
                <p>Posted by {post.User.username}</p>
                <p>Posted {getTimeAgo(post.createdAt)} ago</p>
                {/* Convert the binary data to base64 and set as src */}
                <img
                    src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
                    alt={`Post: ${post.id}`}
                />
            </li>
        ))}
    </ul>
    ) : (
        <p>No posts available.</p>
    )}
          </div>
          {/* Add sign-in and sign-up buttons */}
          <div>
            <button onClick={navigateLogin}>Sign In</button>
            <button onClick={navigateRegister}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;