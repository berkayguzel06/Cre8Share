// Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/Admin.css";

const Admin = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfComments, setListOfComments] = useState([]);
  const [isAdminAuthenticated, setAdminAuthentication] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    if (isAdminAuthenticated && selectedAction) {
      fetchData();
    }
  }, [isAdminAuthenticated, selectedAction]);

  const fetchData = async () => {
    try {
      let response;
      switch (selectedAction) {
        case 'posts':
          response = await axios.get('http://localhost:5000/admin/post');
          setListOfPosts(response.data);
          break;
        case 'users':
          response = await axios.get('http://localhost:5000/admin/user');
          setListOfUsers(response.data);
          break;
        case 'comments':
          response = await axios.get('http://localhost:5000/admin/comment');
          setListOfComments(response.data);
          break;
        default:
          console.error('Invalid action:', selectedAction);
      }
    } catch (error) {
      console.error(`Error fetching ${selectedAction}:`, error);
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

  const deletePost = (postId) => {
    axios.delete(`http://localhost:5000/admin/post/${postId}`).then((response) => {
      console.log('Post deleted:', response.data);
    }).catch((error) => {
      console.error('Error deleting post:', error);
    });
  };
  const deleteUser = (userId) => {
      axios.delete(`http://localhost:5000/user/${userId}`).then((response) => {
        console.log('User deleted:', response.data);
      }).catch((error) => {
        console.error('Error deleting post:', error);
      });

      axios.delete(`http://localhost:5000/friend/${userId}`).then((response) => {
        console.log('Friend deleted:', response.data);
      }).catch((error) => {
        console.error('Error deleting post:', error);
      });

  };
  const deleteComment = (commentId) => {
    axios.delete(`http://localhost:5000/admin/comment/${commentId}`).then((response) => {
      console.log('Comment deleted:', response.data);
    }).catch((error) => {
      console.error('Error deleting post:', error);
    });
  };

  return (
    <div>
      {isAdminAuthenticated ? (
        <>
          <h1>Admin Page</h1>
          <div>
            <button onClick={() => setSelectedAction('posts')}>Get Posts</button>
            <button onClick={() => setSelectedAction('users')}>Get Users</button>
            <button onClick={() => setSelectedAction('comments')}>Get Comments</button>
          </div>
          <div className="data-container">
            {selectedAction === 'posts' && (
              <div className="posts-container">
                {listOfPosts.map((post) => (
                  <div key={post.id} className="post-item">
                    {/* Display post info */}
                    <p>Post ID: {post.id}</p>
                    <p>Tag: {post.title}</p>
                    <p>User Id: {post.User.id}</p>
                    <p>Like: {post.like}</p>
                    <p>Report: {post.report}</p>
                    <img src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`} alt="post" />
                    <button onClick={() => deletePost(post.id)}>Delete Post</button>
                  </div>
                ))}
              </div>
            )}
            {selectedAction === 'users' && (
              <div className="users-container">
                {listOfUsers.map((user) => (
                  <div key={user.id} className="user-item">
                    {/* Display user info */}
                    <p>User ID: {user.id}</p>
                    <p>Username: {user.username}</p>
                    <p>E-mail: {user.email}</p>
                    <button onClick={() => deleteUser(user.id)}>Delete User</button>
                  </div>
                ))}
              </div>
            )}
            {selectedAction === 'comments' && (
              <div className="comments-container">
                {listOfComments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    {/* Display comment info */}
                    <p>Comment ID: {comment.id}</p>
                    <p>User Id: {comment.UserId}</p>
                    <p>Post Id: {comment.PostId}</p>
                    <p>Post Id: {comment.PostId}</p>
                    <p>Content: {comment.content}</p>
                    <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                  </div>
                ))}
              </div>
            )}
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
