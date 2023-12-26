// UserDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../Helpers/UserContext.js';

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const { userData, setUserData } = useContext(UserContext);
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

  const addFriend = async () => {
    const friendship = {
      friendID: user.id,
      userid: userData.id,
      status: false
    };
    console.log(friendship);
    const isAddedResponse  = await axios.get(`http://localhost:5000/friend/${userData.id}`);
    console.log("isAddedResponse:", isAddedResponse);
    const isAdded = isAddedResponse.data;
    console.log("isadded: ", isAdded);
    if(isAdded != null && isAdded.status === true){
      alert("Already added");
      return;
    }else if(isAdded != null && isAdded.status === false){
      alert("Pending");
      return;
    }
    const response = await axios.post('http://localhost:5000/friend',friendship).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    console.log(response);
  };
  
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>
      <p>Lastname: {user.lastname}</p>
      <p>Email: {user.email}</p>
      <button onClick={addFriend}>Add Friend</button>
      {/* Add more user details as needed */}
    </div>
  );
};

export default User;
