import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../Helpers/UserContext.js';
import logoImage from '../images/cre8share-logo12.png';
import profileImage from '../images/pp1.png';
import '../css/Header.css';

const Header = () => {
  const [searchType, setSearchType] = useState('username');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [userSearchResults, setUserSearchResults] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleViewAllUsers = () => {
    navigate('/listedprofiles', { state: { userSearchResults } });
  };

  const navigateCreatePost = () => {
    navigate('/createpost');
  };

  const navigateImageGeneration = () => {
    navigate('/ImageGenerator');
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setShowProfileMenu((prev) => !prev);
  };
  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`);
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

  const handleUserSearch = async () => {
    // Your user search logic here
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    // Trigger search on every input change
    handleUserSearch();
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
          {/* Show first 5 user search results */}

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
        <button className="create-post-button" style={{borderRadius: '25%',}} onClick={navigateCreatePost}>
          Create a Post
        </button>
        <button className="create-post-button" style={{borderRadius: '25%',}} onClick={navigateImageGeneration}>
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
  );
};

export default Header;
