import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../Helpers/UserContext.js';
import Header from './Header.js';
import '../css/User.css';
import editProfileButtonPic from '../images/EditProfileButtonPic.png';
import profileImage from '../images/pp.png';

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [showEditBox, setShowEditBox] = useState(false);
  const navigate = useNavigate();
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [bannerPictureFile, setBannerPictureFile] = useState(null);
  const [friendList, setFriendList] = useState(null);
  const [showFriend, setShowFriend] = useState(false);
  const [isFriend, setIsFriend] = useState(null);

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

  const checkFriend = async () => {
    const friendship = {
      friendID: userProfile.id,
      userid: userData.id,
    };
    const isAddedResponse = await axios.get(`http://localhost:5000/friend/${userData.id}`, { params: friendship });
    const isAdded = isAddedResponse.data;
    console.log("set is freind: ", isAdded);
    setIsFriend(isAdded);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userProfile && userData) {
        try {
          await checkFriend();
        } catch (error) {
          console.error('Error checking friend:', error);
        }
      }
    };

    fetchData();
  }, [userProfile, userData]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/friend/profile/username/${userProfile.id}`);
      if (response.data) {
        console.log("firends: ", response.data);
        setFriendList(response.data);
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user profile details:', error);
    }
  };

  const getFriend = async () => {
    try {
      await fetchFriends();
      if (showFriend === false) {
        setShowFriend(true);
      } else {
        setShowFriend(false);
      }
    } catch (error) {
      console.error('Error fetching user profile details:', error);
    }
  };

  const addFriend = async () => {
    const friendship = {
      friendID: userProfile.id,
      userid: userData.id,
      status: false,
    };
    console.log(isFriend);
    if (isFriend != null) {
      if (isFriend.UserId === userData.id && isFriend.friendID === userProfile.id || isFriend.UserId === userProfile.id && isFriend.friendID === userData.id) {
        if (isFriend.status === true) {
          setIsFriend(isFriend);
          alert("Already added");
          return;
        }
      }
      if (isFriend.UserId === userData.id && isFriend.friendID === userProfile.id) {
        alert("Already sended");
        return;
      }
    }
    else {
      const response = await axios.post('http://localhost:5000/friend', friendship).then((response) => {
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
      userid: userProfile.id,
      status: true,
    };
    const response = await axios.post('http://localhost:5000/friend/update', friendship).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    console.log(response);
    checkFriend();
  };

  const declineFriend = async () => {
    const friendship = {
      userid: userProfile.id,
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

      setProfilePictureFile(null);
      setBannerPictureFile(null);
      setShowEditBox(false);
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };



  return (
    <div>
      <Header />
      <div className="user-details-container">
        <div className="user-banner">
          {!userProfile || !userProfile.banner ? (
            // Yükleme durumu veya placeholder
            <div>User Banner</div>
          ) : (
            // Profil resmini burada render et
            <img src={`data:image/png;base64,${arrayBufferToBase64(userProfile.banner)}`} alt="Profile Picture" />
          )}
          <div className="user-profile">
            {!userProfile || !userProfile.pfp ? (
              // Yükleme durumu veya placeholder
              <div>User Profile Photo</div>
            ) : (
              // Profil resmini burada render et
              <img src={`data:image/png;base64,${arrayBufferToBase64(userProfile.pfp)}`} alt="Profile Picture" />
            )}
            <h2 className="profiless-username">{userProfile?.username}</h2>
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
      <div>
        <button className='follower-button' onClick={getFriend}>Followers</button>
        {userData && userProfile && userData.id !== userProfile.id && (
          <>
            {isFriend === null && (
              <button onClick={addFriend}>Add Friend</button>
            )}
            {isFriend && isFriend.status === false && isFriend.friendID === userData.id && (
              <div>
                <button onClick={acceptFriend}>Accept</button>
                <button onClick={declineFriend}>Decline</button>
              </div>
            )}
            {isFriend && isFriend.status === true && (
               <button
               className="follower-button" /* Added class for styling */
               onClick={declineFriend}
               style={{ float: 'right' }} /* Move the button to the right */
             >Remove Friend</button>
            )}
          </>
        )}

        {!showFriend ? (
          <p></p>
        ) : (
          <ul>
            {friendList?.map((friend) => (
              friend.username !== userProfile.username && (
                <li className="friend-container" key={friend.id} >
                  <Link to={`/user/${friend.username}`}>
                  {friend.pfp ? (
                      <img
                        src={`data:image/png;base64,${arrayBufferToBase64(friend.pfp)}`}
                        className="profiless-image"
                      />
                    ) : (
                      <img
                        src={profileImage}
                        className="profiless-image"
                        alt="Default Profile Picture"
                      />
                    )}
                    <span className="profiless-username">{friend.username}</span>
                  </Link>
                </li>
              )
            ))}
          </ul>
        )}
      </div>
      <div className="user-postsss">
        <ul className="posts-containerrrr">
          {userProfile?.Posts.map((post) => (
            <li  className="post-containerrr" key={post.id}>
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

export default Profile;
