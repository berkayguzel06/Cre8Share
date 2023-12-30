import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import '../css/GuestPage.css';

const GuestPage = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/post/guestpage')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setListOfPosts(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const getTimeAgo = (createdAt) => {
    // Your existing code for formatting time difference
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  const navigateRegister = () => {
    navigate('/register');
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  
  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };


  return (
    <div>
      <div className="wrapper">
        <form action="">
          <div className="background-posts">
            {listOfPosts.map((post, index) => (
              <div
                key={post.id}
                className={`background-post-item animate-post-${index}`}
                style={{
                  backgroundImage: `url(data:image/png;base64,${arrayBufferToBase64(post.content)})`,
                }}
              />
            ))}
          </div>
          <div>
            <h2>Latest Posts</h2>
            {listOfPosts.length > 0 ? (
              <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {listOfPosts.map((post) => (
                  <div key={post.id} className="post-item">
                    {/* Display post content here */}
                    <img
                      src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
                      alt={`Post: ${post.id}`}
                    />
                    {/* Other post details */}
                  </div>
                ))}
              </Masonry>
            ) : (
              <p>No posts available.</p>
            )}
          </div>
          <div>
            <button onClick={navigateLogin}>Sign In</button>
            <button onClick={navigateRegister}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestPage;
