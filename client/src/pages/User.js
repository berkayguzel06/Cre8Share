// UserDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../Helpers/UserContext.js';

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [ isFriend, setIsFriend ] = useState(null);
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
  
  useEffect(() => {
    if (user) {
      console.log(user);
      checkFriend();
    }
  }, [user]);

  const checkFriend = async () => {
    const friendship = {
      friendID: user.id,
      userid: userData.id,
    };
    const isAddedResponse = await axios.get(`http://localhost:5000/friend/${userData.id}`, { params: friendship });
    const isAdded = isAddedResponse.data;
    console.log("set is freind: ",isAdded);
    setIsFriend(isAdded);
  };

  const addFriend = async () => {
    const friendship = {
      friendID: user.id,
      userid: userData.id,
      status: false,
    };
    console.log(isFriend);
    if(isFriend != null ){
      if(isFriend.UserId===userData.id && isFriend.friendID===user.id || isFriend.UserId===user.id && isFriend.friendID===userData.id){
        if(isFriend.status === true){
          setIsFriend(isFriend);
          alert("Already added");
          return;
        }
      }
      if(isFriend.UserId===userData.id && isFriend.friendID===user.id){
        alert("Already sended");
        return;
      }
    }
    else{
      const response = await axios.post('http://localhost:5000/friend',friendship).then((response) => {
      console.log(response);
      }, (error) => {
          console.log(error);
      });
      console.log(response);
      return;
    }
    checkFriend();
  };
  
  const acceptFriend = async () => {
    const friendship = {
      friendID: userData.id,
      userid: user.id,
      status: true,
    };
    const response = await axios.post('http://localhost:5000/friend/update', friendship ).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    console.log(response);
    checkFriend();
  };

  const declineFriend = async () => {
    const friendship = {
      userid: user.id,
      friendID: userData.id,
    };
  
    try {
      const response = await axios.delete('http://localhost:5000/friend/', {
        data: friendship,  // Send data in the request body
      });
  
      console.log(response);
      checkFriend();
    } catch (error) {
      console.error(error);
    }
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
      {isFriend === null && (
        <button onClick={addFriend}>Add Friend</button>
      )}
      {isFriend && isFriend.status === false && isFriend.friendID===userData.id && (
        <div>
        <button onClick={acceptFriend}>Accept</button>
        <button onClick={declineFriend}>Decline</button>
        </div>
      )}
      {isFriend && isFriend.status === true &&(
        <button onClick={declineFriend}>Remove Friend</button>
      )}
      {/* Add more user details as needed */}
    </div>
  );
};

export default User;
