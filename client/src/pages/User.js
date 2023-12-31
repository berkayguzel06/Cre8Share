import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../Helpers/UserContext.js';
import Header from './Header.js';
import '../css/User.css';
import editProfileButtonPic from '../images/EditProfileButtonPic.png';

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [showEditBox, setShowEditBox] = useState(false);
  const navigate = useNavigate();
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [bannerPictureFile, setBannerPictureFile] = useState(null);

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

  // handleBannerUpload fonksiyonu
  const handleSubmit = async () => {
    try {
      if (profilePictureFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (reader.readyState === FileReader.DONE) {
            const base64String = reader.result.split(',')[1];
            try {
              await axios.post(`http://localhost:5000/user/updatepfp/${userProfile.id}`, {
                profilePicture: base64String,
              });
            } catch (error) {
              console.error('Error uploading profile picture:', error);
            }
          }
        };
        reader.readAsDataURL(profilePictureFile);
      }

      if (bannerPictureFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (reader.readyState === FileReader.DONE) {
            const base64String = reader.result.split(',')[1];
            try {
              await axios.post(`http://localhost:5000/user/updatebanner/${userProfile.id}`, {
                bannerPicture: base64String,
              });
            } catch (error) {
              console.error('Error uploading banner:', error);
            }
          }
        };
        reader.readAsDataURL(bannerPictureFile);
      }

      // Diğer verilerin güncellenmesi için gerekli işlemler buraya eklenebilir...

      setProfilePictureFile(null);
      setBannerPictureFile(null);
      setShowEditBox(false);
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };
  console.log("userProfile?.pfp",userProfile?.pfp);
  

  
  
  return (
    <div>
      <Header />
      <div className="user-details-container">
        <div className="user-banner">
        {!userProfile || !userProfile.pfp ? (
  // Yükleme durumu veya placeholder
  <div>Loading...</div>
) : (
  // Profil resmini burada render et
  <img src={`data:image/png;base64,${arrayBufferToBase64(userProfile.banner)}`} alt="Profile Picture" />
)}
          <div className="user-profile">
          {!userProfile || !userProfile.pfp ? (
  // Yükleme durumu veya placeholder
  <div>Loading...</div>
) : (
  // Profil resmini burada render et
  <img src={`data:image/png;base64,${arrayBufferToBase64(userProfile.pfp)}`} alt="Profile Picture" />
)}
            <h2>{userProfile?.username}</h2>
            {userProfile?.username === userData?.username && (
              <button
                className="edit-profile-button"
                style={{ backgroundImage: `url(${editProfileButtonPic})` }}
                onClick={() => setShowEditBox(true)}
              >
              </button>
            )}
          </div>
          <div className={`edit-profile-box ${showEditBox ? 'active' : ''}`}>
            <input type="file" onChange={(e) => setProfilePictureFile(e.target.files[0])} />
            <input type="file" onChange={(e) => setBannerPictureFile(e.target.files[0])} />
            <button className="save-changes-button" onClick={handleSubmit}>Save Changes</button>
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

export default Profile;
