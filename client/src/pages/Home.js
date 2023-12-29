import React, { useState, useEffect } from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Home.css';
import '../css/Header.css';
import logoImage from '../images/cre8share-logo12.png';
import profileImage from '../images/pp1.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Helpers/UserContext.js';

const Home = () => {
  const [originalListOfPosts, setOriginalListOfPosts] = useState([]);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [uniqueTitles, setUniqueTitles] = useState([]);
  const [searchType, setSearchType] = useState('username');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [userSearchResults, setUserSearchResults] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios
      .get('http://localhost:5000/post', {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setOriginalListOfPosts(response.data);
          setListOfPosts(response.data);
          setUniqueTitles([...new Set(response.data.map((post) => post.title))]);
        } else {
          console.error('Invalid data format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  const navigateCreatePost = () => {
    navigate('/createpost');
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setShowProfileMenu((prev) => !prev);
  };

  const handleProfileMenuClick = (option) => {
    if (option === 'profile') {
      navigate(`/profile/${userData.username}`);
    } else if (option === 'settings') {
      navigate('/settings');
    } else if (option === 'logout') {
      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
      navigate('/');
    }
    setShowProfileMenu(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const navigateImageGeneration = () => {
    navigate('/ImageGenerator');
  };

  useEffect(() => {
    const grid = document.querySelector('.posts-list');
    const masonry = new Masonry(grid, {
      itemSelector: '.post-container',
      columnWidth: '.post-container',
      percentPosition: true,
    });
    imagesLoaded(grid).on('progress', () => {
      masonry.layout();
    });
  }, [listOfPosts]);

  useEffect(() => {
    setListOfPosts((prevState) => {
      const filteredPosts = selectedCategory
        ? originalListOfPosts.filter((post) => post.title === selectedCategory)
        : originalListOfPosts;

      const grid = document.querySelector('.posts-list');
      const masonry = new Masonry(grid, {
        itemSelector: '.post-container',
        columnWidth: '.post-container',
        percentPosition: true,
      });
      imagesLoaded(grid).on('progress', () => {
        masonry.layout();
      });

      return filteredPosts;
    });
  }, [selectedCategory, originalListOfPosts]);

  useEffect(() => {
    return () => {
      setSelectedCategory(null);
    };
  }, []);

  const handleUserSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/searchedusers/${searchInput}`);
      setUserSearchResults(response.data.ListOfUsers);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    // Trigger search on every input change
    handleUserSearch();
  };

  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };


  const handleViewAllUsers = () => {
    navigate('/listedprofiles', { state: { userSearchResults } });
  };

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <a href="/home">
            <img src={logoImage} alt="Logo" />
          </a>
        </div>
        <div className="header-middle">
          <input
          type="text"
          placeholder={`Search by ${searchType === 'username' ? 'Username' : 'Post'}`}
          value={searchInput}
           onChange={handleInputChange} // Triggered on every input change
          />
          <button
            style={{
              backgroundColor: '#4b4242',
              color: '#000000',
            }}
            onClick={handleViewAllUsers}
          >
            Search
          </button>
           {/* Show first 5 user search results */}
           
           {userSearchResults && userSearchResults.length > 0 && (
         <div className="user-search-results">
            <h2>User Search Results</h2>
              <div className="search-results-list">
              {userSearchResults.slice(0, 5).map((user, index) => (
            <div className="search-result" key={index} onClick={() => navigateToProfile(user.id)}>
               {user.username}
         </div>
          ))}
            </div>
         <button onClick={handleViewAllUsers}>View All Users</button>
         </div>
          )}
        </div>
        <button className="create-post-button" onClick={navigateCreatePost}>
          Create a Post
        </button>
        <button className="create-post-button" onClick={navigateImageGeneration}>
          Cre8 and Share
        </button>
        <div className="header-right">
          <div className="profile-picture" onClick={toggleProfileMenu}>
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
  
      <div className="posts-container">
        {listOfPosts.length > 0 && (
          <div className="post-menu">
            <h2>CATEGORIES</h2>
            <ul>
              <li onClick={() => handleCategoryClick(null)}>All</li>
              {uniqueTitles.map((title, index) => (
                <li key={index} onClick={() => handleCategoryClick(title)}>
                  {title}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedCategory && (
          <div className="selected-category">
            <h3>Selected Category: {selectedCategory}</h3>
          </div>
        )}
        <ul className="posts-list">
          {listOfPosts.map((post) => (
            <li key={post.id} className="post-container">
              {post.User.id === userData.id ? (
                <Link to={`/profile/${post.User.username}`}>
                  <div className="username-overlay">{post.User.username}</div>
                </Link>
              ) : (
                <Link to={`/user/${post.User.username}`}>
                  <div className="username-overlay">{post.User.username}</div>
                </Link>
              )}
  
              <Link to={`/post/${post.id}`}>
                <img
                  src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
                  alt={`Post ID: ${post.id}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
