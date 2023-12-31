import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header.js';
import '../css/Profile.css';
import editProfileButtonPic from '../images/EditProfileButtonPic.png';
import userBanner from '../images/UserBanner.jpg';
import userProfilePicture from '../images/UserProfilePicture.jpg';

const Profileold = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [firendList, setFirendList] = useState(null);
  const [showEditBox, setShowEditBox] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/profile/${username}`);
        if (response.data) {
          setUserProfile(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile details:', error);
      }
    };
    
    fetchUserProfile();
  }, [username]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/friend/profile/username/${userProfile.id}`);
      if (response.data) {
        setFirendList(response.data);
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user profile details:', error);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  const handleUserDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/${userProfile.id}`);
      const friendDelete = await axios.delete(`http://localhost:5000/friend/${userProfile.id}`);
      if (response.data && response.data.message === 'User deleted') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        alert('User deleted');
        navigate('/');
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleBannerUpload = async () => {

  };
  const handleProfileImageUpload= async () => {

  };

  return (
    <div>
      <Header />
      <div className="user-details-container">
        <div className="user-banner">
          <div className="user-profile">
            <img src={userProfilePicture} alt="Profile" className="user-profile-img" />
            <h2>{userProfile?.username}</h2>
            <button
              className="edit-profile-button"
              style={{ backgroundImage: `url(${editProfileButtonPic})` }}
              onClick={() => setShowEditBox(true)}
            >
            </button>
          </div>
          <div className={`edit-profile-box ${showEditBox ? 'active' : ''}`}>
        {/*<input type="text" placeholder="Username" value={userProfile?.username} />*/}
        <input type="file" onChange={handleBannerUpload} />
        <input type="file" onChange={handleProfileImageUpload} />
        <button className="save-changes-button">Save Changes</button>
        <button className="delete-account-button" onClick={handleUserDelete}>Delete Account</button>
        <span className="close-button" onClick={() => setShowEditBox(false)}>X</span>
        </div>
        </div>
      </div>
      <div className="user-posts">
        {userProfile?.Posts.map((post) => (
          <li key={post.id} className="post-container">
            <Link to={`/post/${post.id}`}>
              <img
                src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
                alt={`Post ID: ${post.id}`}
              />
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Profileold;