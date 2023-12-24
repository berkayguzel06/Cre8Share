import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Home.css';
import '../css/Header.css';
import logoImage from '../images/cre8share-logo12.png';
import profileImage from '../images/pp1.png';
import { Link } from "react-router-dom";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [searchType, setSearchType] = useState('username'); // 'username' or 'post'
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/post', {
      headers: { accessToken: sessionStorage.getItem('accessToken') },
    })
      .then(response => {
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

  const navigateCreatePost = () => {
    navigate('/createpost');
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation(); // Prevent the event from propagating to the document
    setShowProfileMenu((prev) => !prev);
  };

  const handleProfileMenuClick = option => {
    if (option === 'profile') {
      navigate('/profile');
    } else if (option === 'settings') {
      navigate('/settings');
    } else if (option === 'logout') {
      sessionStorage.removeItem('accessToken');
      navigate('/guestpage');
    }
    // Close the profile menu after clicking an option
    setShowProfileMenu(false);
  };

  return (
    <div>
      <div className="header">
  {/* Left side with logo */}
  <div className="header-left">
    <a href="/home">
      <img src={logoImage} alt="Logo" />
    </a>
  </div>
  {/* Middle part with search bar, switch button, and create post button */}
  <div className="header-middle">
    <input type="text" placeholder={`Search by ${searchType === 'username' ? 'Username' : 'Post'}`} />
    <button onClick={() => setSearchType(prevType => (prevType === 'username' ? 'post' : 'username'))}>
      Switch
    </button>
    {/* Move the "Create a Post" button to the header */}
    
  </div>
  <button className="create-post-button" onClick={navigateCreatePost}>Create a Post</button>
  {/* Right side with user actions and profile picture */}
  <div className="header-right">
    <div className="profile-picture" onClick={toggleProfileMenu}>
      {/* Replace "/path-to-your-profile-pic.jpg" with the actual path to your profile picture */}
      <img src={profileImage} alt="Profile" />
    </div>
    {showProfileMenu && (
      <div className="profile-menu">
        <button onClick={() => handleProfileMenuClick('profile')}>My Profile</button>
        <button onClick={() => handleProfileMenuClick('settings')}>Settings</button>
        <button onClick={() => handleProfileMenuClick('logout')}>Log Out</button>
      </div>
          )}
        </div>
      </div>

      {/* Display the latest posts */}
      <div className="posts-container">
      {listOfPosts.length > 0 ? (
  <ul className="posts-list">
    {listOfPosts.map(post => (
      <li key={post.id} className="post-container">
        {/* Display username overlay */}
        
        <Link to={`/user/${post.User.username}`}>
          <div className="username-overlay">{post.User.username}</div>
        </Link>
        <Link to={`/post/${post.id}`}>
        <img
          src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
          alt={`Post ID: ${post.id}`}
        />
        </Link>
        {/* <p>Posted by {post.User.username}</p> */}
        {/* <p>Posted {getTimeAgo(post.createdAt)} ago</p> */}
        {/* <p>{post.title}</p> */}
      </li>
    ))}
  </ul>
) : (
  <p>No posts available.</p>
)}
</div>
    </div>
  );
};

export default Home;