import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/post')  // Assuming you're using GET to retrieve posts
      .then(response => {
        console.log('Response:', response.data);
        // Ensure that the response.data is an array before calling setListOfPosts
        if (Array.isArray(response.data)) {
          setListOfPosts(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Function to convert binary data to base64
  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  // Function to format the time difference
  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hoursAgo} hours ago`;
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home</title>
      <link rel="stylesheet" href="style.css" />
      <div className="wrapper">
        <form action="">
          <h1>Cre8Share</h1>
          {/* Display the latest posts */}
          <div>
            <h2>Latest Posts</h2>
            {listOfPosts.length > 0 ? (
              <ul>
                {listOfPosts.map(post => (
                  <li key={post.id}>
                    <p>Posted by {post.UserId}</p>
                    <p>Posted {getTimeAgo(post.createdAt)} ago</p>
                    {/* Convert the binary data to base64 and set as src */}
                    <img
                      src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
                      alt={`Post: ${post.id}`}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts available.</p>
            )}
          </div>
          {/* Add sign-in and sign-up buttons */}
          <div>
            <button onClick={() => console.log('Sign In')}>Sign In</button>
            <button onClick={() => console.log('Sign Up')}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;