// Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/Admin.css";

const Admin = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isAdminAuthenticated, setAdminAuthentication] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchPosts();
    }
  }, [isAdminAuthenticated]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/post');
      if (Array.isArray(response.data)) {
        setListOfPosts(response.data);
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  const handleLogin = () => {
    axios.post('http://localhost:5000/admin/login', {username: username, password: password}).then((response) => {
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        setAdminAuthentication(true);
      } else {
        console.error('Error during login:', response.data.error);
      }
    }).catch((error) => {
      console.error('Error during login:', error);
    });
  };

  return (
    <div>
      {isAdminAuthenticated ? (
        <>
          <h1>Admin Page</h1>
          <div className="posts-container">
            {listOfPosts.map((post) => (
              <div key={post.id} className="post-container">
                <Link to={`/user/${post.User.username}`}>
                  <div className="username-overlay">{post.User.username}</div>
                </Link>
                <div className="likenumber">
                  {post.like}
                </div>
                <Link to={`/post/${post.id}`}>
                  <img
                    src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
                    alt={`Post ID: ${post.id}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1>Admin Login</h1>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
