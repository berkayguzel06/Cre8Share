import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../Helpers/UserContext.js';
import axios from 'axios';
import logoImage from '../images/cre8share-logo.png';
import '../css/Header.css';
import profileImage from '../images/pp.png';

const Header = () => {
  const [searchType, setSearchType] = useState('username');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [userSearchResults, setUserSearchResults] = useState([]);
  const { userData, setUserData } = useContext(UserContext); // Get the user data from context
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const [Userpfp, setUserpfp] = useState(null);

  useEffect(() => {
    // Fetch user profile and picture
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userData.username}`);
        setUserProfile(response.data);
        setUserpfp(response.data.pfp);
      } catch (error) {
        console.error('Error fetching user profile picture:', error);
      }
    };

    fetchData();
  }, [userData.username]);




  const navigateCreatePost = () => {
    navigate('/createpost');
  };
  const navigateToProfile = (userId) => {
    navigate(`/user/${userId}`);
    setUserSearchResults([]);
  };
  const handleViewAllUsers = () => {
    navigate('/listedprofiles', { state: { userSearchResults } });
  };
  const navigateImageGeneration = () => {
    navigate('/ImageGenerator');
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setShowProfileMenu((prev) => !prev);
  };

  const handleProfileMenuClick = (option) => {
    if (option === 'profile') {
      navigate(`/user/${userData.username}`);
    } else if (option === 'aboutus') {
      navigate('/aboutus');
    } else if (option === 'logout') {
      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
      navigate('/');
    }
    setShowProfileMenu(false);
  };



  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    // Trigger search on every input change
    handleUserSearch();
  };

  const handleUserSearch = async () => {
    // Search for users based on search input
    try {
      const response = await axios.get(`http://localhost:5000/user/searchedusers/${searchInput}`);
      setUserSearchResults(response.data.ListOfUsers);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  return (
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
          style={{ borderRadius: '15%' }}
        />
        <button
          style={{
            marginLeft: '5px',
            borderRadius: '25%',
            backgroundColor: '#4b4242',
            color: '#000000',
          }}
          onClick={handleViewAllUsers}
        >
          Search
        </button>
        {userSearchResults && userSearchResults.length > 0 && (
          <div className="user-search-results">
            <h2>User Search Results</h2>
            <div className="search-results-list">
              {userSearchResults.slice(0, 5).map((user, index) => (
                <div className="search-result" key={index} onClick={() => navigateToProfile(user.username)}>
                  {user.username}
                </div>
              ))}
            </div>
            <button onClick={handleViewAllUsers}>View All Users</button>
          </div>
        )}
      </div>
      <button className="create-post-button" style={{ borderRadius: '25%', }} onClick={navigateCreatePost}>
        Create a Post
      </button>
      <button className="create-post-button" style={{ borderRadius: '25%', }} onClick={navigateImageGeneration}>
        Cre8 and Share
      </button>

      <div className="header-right">
        {userProfile && userProfile && (
          <div className="profile-picture" onClick={toggleProfileMenu}>
            {Userpfp ? (
              <img src={`data:image/png;base64,${arrayBufferToBase64(Userpfp)}`} alt="Profile" />
            ) : (
              <img src={profileImage} alt="Default Profile" />
            )}
          </div>
        )}
        {showProfileMenu && (
          <div className="profile-menu">
            <button onClick={() => handleProfileMenuClick('profile')}>My Profile</button>
            <button onClick={() => handleProfileMenuClick('aboutus')}>ABOUT US</button>
            <button onClick={() => handleProfileMenuClick('logout')}>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;