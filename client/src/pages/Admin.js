// Admin.js
import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Admin = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchUser();
  }, []);

  const fetchPosts = async () => {
    axios.get('http://localhost:5000/post').then((response) => {
        if (Array.isArray(response.data)) {
          setListOfPosts(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {/* Add your admin content here */}
    </div>
  );
}

export default Admin;
