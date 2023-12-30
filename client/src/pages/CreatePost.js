import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/CreatePost.css';
import '../css/Header.css';
import logoImage from '../images/cre8share-logo12.png';
import profileImage from '../images/pp1.png';
import { useContext } from 'react';
import { UserContext } from '../Helpers/UserContext.js';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  const { imageData } = location.state || {};
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const [searchType, setSearchType] = useState('username');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [userSearchResults, setUserSearchResults] = useState([]);
  const { userData, setUserData } = useContext(UserContext);


  const getUsernameById = async (userId) => {
    try {
      const response = await axios.post('http://localhost:5000/user/usernamewithid', { id: userId });
      console.log(response);
      // Extract the username from the response data
      const username = response.data.username;
      return username;
    } catch (error) {
      console.error('Error getting username by ID:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };
  
  const getUsernameFromToken = () => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    //console.log('Token Payload:', payload); // Log the payload to check its structure
    console.log('Token Payload:', getUsernameById(payload['id'])); // Log the payload to check its structure

    
    return payload.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

  const username = getUsernameFromToken(token);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    }else if (imageData) {
      setPreview(imageData);
    } else {
      setPreview('');
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  
  const handlePreview = () => {
    if (!title){
      setError('Title is required for preview');
      return;
    }
    if(!image && !imageData){
      setError('Image is required for preview');
      return;
    }
   
    setError('');
    setShowPreview(true);
    console.log('Preview:', { title, username, imagePreview: preview });
  };

  
  const uploadFromFile = () => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.readAsDataURL(image);
    });
  };

  const handleSubmit = async () => {
      if (!title){
        setError('Title is required for preview');
        return;
      }
      if(!image && !imageData){
        setError('Image is required for preview');
        return;
      }
      const id = JSON.parse(atob(token.split('.')[1]))['id'];
      setError('');
      let base64String = null;
      if(image){
        base64String = await uploadFromFile();
      }else{
        base64String = imageData.split(',')[1];
      }
      const post = {
        title: title,
        content: base64String,
        userid: id,
      };

      console.log('Post:', post);
      axios.post('http://localhost:5000/post/createpost', post, {
        headers: {
          'accessToken': token,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Post submitted successfully:', response.data);
          navigate('/home');
        })
        .catch((error) => {
          console.error('Error submitting post:', error);
          setError('Error submitting post. Please try again.');
        });
    };
    
    const handleInputChange = (e) => {
      setSearchInput(e.target.value);
      // Trigger search on every input change
      handleUserSearch();
    };
  
    const navigateToProfile = (userId) => {
      navigate(`/profile/${userId}`);
    };
  
  
    const handleViewAllUsers = () => {
      navigate('/listedprofiles', { state: { userSearchResults } });
    };
    const handleUserSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/searchedusers/${searchInput}`);
        setUserSearchResults(response.data.ListOfUsers);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    };
    const navigateCreatePost = () => {
      navigate('/createpost');
    };
  
    const toggleProfileMenu = (e) => {
      e.stopPropagation();
      setShowProfileMenu((prev) => !prev);
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
  
  
    const navigateImageGeneration = () => {
      navigate('/ImageGenerator');
    };


  return token ? (
    
    <div className="create-post-body">
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
          />
          <button
            style={{
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
            <div className="search-result" key={index} onClick={() => navigateToProfile(user.id)}>
               {user.username}
         </div>
          ))}
            </div>
         <button onClick={handleViewAllUsers}>View All Users</button>
         </div>
          )}
        </div>
        <button className="create-post-button" onClick={navigateCreatePost}>
          Create a Post
        </button>
        <button className="create-post-button" onClick={navigateImageGeneration}>
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

      <h1>Create a Post</h1>
      {showPreview ? (
        <div>
          <h2>Post Preview</h2>
          <p>Tag: {title}</p>
          <p>Username: {username}</p>
          <img src={preview} alt="Post Preview" style={{ maxWidth: '100%' }} />
          {/* You can add more details from the preview if needed */}
          <button type="button" onClick={() => setShowPreview(false)}>
            Back to Edit
          </button>
        </div>
      ) : (
        <form>
          <label>
            Title:  
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <br />
          <label>
            Upload Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <br />
          {preview && <img src={preview} alt="Post Preview" style={{ maxWidth: '100%' }} />}
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="button" onClick={handlePreview}>
            Preview
          </button>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  ) : null;
};

export default CreatePost;

