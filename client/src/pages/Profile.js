import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${username}`);
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

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userProfile.username}</p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default Profile;
