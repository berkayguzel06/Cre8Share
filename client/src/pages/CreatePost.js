import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem('accessToken');
  const token = sessionStorage.getItem('accessToken');

  
  const getUsernameById = async (userId) => {
    try {
      const response = await axios.post('http://localhost:5000/user/getusernamewithid', { id: userId });
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
    if (!title || !image) {
      setError('Title and image are required for preview');
      return;
    }

    setError('');
    setShowPreview(true);
    console.log('Preview:', { title, username, imagePreview: preview });
  };

  const handleSubmit = () => {
    if (!title || !image) {
      setError('Title and image are required for submission');
      return;
    }

    setError('');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    axios.post('http://localhost:5000/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accessToken': accessToken,
      },
    })
      .then((response) => {
        console.log('Post submitted successfully:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error submitting post:', error);
        setError('Error submitting post. Please try again.');
      });
  };

  return accessToken ? (
    <div>
      <h1>Create a Post</h1>
      {showPreview ? (
        <div>
          <h2>Post Preview</h2>
          <p>Title: {title}</p>
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

