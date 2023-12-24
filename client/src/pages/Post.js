// PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/post/${postId}`);
        console.log(response.data);
  
        if (response.data && response.data.content) {
          setPost(response.data);
        } else {
          console.error('Invalid data format or missing content:', response.data);
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };
  
    fetchPost();
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Post Details</h2>
      <p>title: {post.title}</p>
      <img
          src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
          alt={`Post ID: ${post.id}`}
        />
      
      {/* Add more details as needed */}
    </div>
  );
};

export default Post;
