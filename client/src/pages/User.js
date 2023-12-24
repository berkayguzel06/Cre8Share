// UserDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${username}`);
        console.log(response.data);

        if (response.data) {
          setUser(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [username]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>
      <p>Lastname: {user.lastname}</p>
      <p>email: {user.email}</p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default User;
