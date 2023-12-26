import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/profile/${username}`);
        console.log(response.data);
        
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

  // Function to convert binary data to base64
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
      console.log(response);
      console.log(friendDelete);
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
  
  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userProfile.username}</p>
      <button onClick={handleUserDelete}>Delete account</button>
      {/* Add more user details as needed */}
      {userProfile.Posts.map(post => (
        <li key={post.id} className="post-container">
          <Link to={`/post/${post.id}`}>
            <img
              src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
              alt={`Post ID: ${post.id}`}
            />
          </Link>
        </li>
      ))}
      {userProfile.Comments.map(comments => (
        <li key={comments.id} className="post-container">
          <p>{comments.content}</p>
        </li>
      ))}
    </div>
  );
};

export default Profile;
