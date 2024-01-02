import React, { useState, useEffect } from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import axios from 'axios';
import '../css/Home.css';
import likebuttonimage from '../images/like.png';
import likebuttonimage2 from '../images/like2.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Helpers/UserContext.js';
import Header from './Header.js';
import griImage from '../images/gri.png';


const Home = () => {
  const [originalListOfPosts, setOriginalListOfPosts] = useState([]);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [uniqueTitles, setUniqueTitles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { userData, setUserData } = useContext(UserContext); // Get the user data from context
  const [likeImages, setLikeImages] = useState({});


  const fetchPosts = async () => {
    // Fetch all posts from the database and add them to state
    axios
      .get('http://localhost:5000/post', {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setOriginalListOfPosts(response.data);
          setListOfPosts(response.data);
          setUniqueTitles([...new Set(response.data.map((post) => post.title))]);
        } else {
          console.error('Invalid data format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Masonry after the component mounts
    const grid = document.querySelector('.posts-list');
    const masonry = new Masonry(grid, {
      itemSelector: '.post-container',
      columnWidth: '.post-container',
      percentPosition: true,
    });
    imagesLoaded(grid).on('progress', () => {
      masonry.layout();
    });
  }, [listOfPosts]);

  useEffect(() => {
    // Filter posts based on the selected category
    setListOfPosts((prevState) => {
      const filteredPosts = selectedCategory
        ? originalListOfPosts.filter((post) => post.title === selectedCategory)
        : originalListOfPosts;

      const grid = document.querySelector('.posts-list');
      const masonry = new Masonry(grid, {
        itemSelector: '.post-container',
        columnWidth: '.post-container',
        percentPosition: true,
      });
      imagesLoaded(grid).on('progress', () => {
        masonry.layout();
      });

      return filteredPosts;
    });
  }, [selectedCategory, originalListOfPosts]);
  useEffect(() => {
    return () => {
      setSelectedCategory(null);
    };
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  

 const handleLike = async (postId) => {
  try {
    const like = {
      PostId: postId,
      userid: userData.id,
    };

    // Check if the user has already liked the post
    const alreadyLiked = listOfPosts.find(post => post.id === postId)?.Likes?.some(like => like.userid === userData.id);

    // Switch between two images based on state
    setLikeImages(prevImages => ({
      ...prevImages,
      [postId]: prevImages[postId] === likebuttonimage ? likebuttonimage2 : likebuttonimage,
    }));

    if (alreadyLiked) {
      // If already liked, remove the like
      await axios.delete(`http://localhost:5000/like/like/${postId}`, {
        data: { userid: userData.id },
      });
    } else {
      // If not liked, add the like
      await axios.post('http://localhost:5000/like/like', like);
    }

    // Fetch posts after liking or unliking
    await fetchPosts();
  } catch (error) {
    console.error('Error like post:', error);
  }
};



  return (
    <div class = "homee">
      <Header />
      
      <div className="posts-container">
        {listOfPosts.length > 0 && (
          <div className="post-menu">
            <h2>CATEGORIES</h2>
            <ul>
              <li onClick={() => handleCategoryClick(null)}>All</li>
              {uniqueTitles.map((title, index) => (
                <li key={index} onClick={() => handleCategoryClick(title)}>
                  {title}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedCategory && (
          <div className="selected-category">
            <h3>Selected Category: {selectedCategory}</h3>
          </div>
        )}
        <ul className="posts-list">
          {listOfPosts.map((post) => (
            <li key={post.id} className="post-container">
              {post.User.id === userData.id ? (
                <Link to={`/user/${post.User.username}`}>
                  <div className="username-overlay">{post.User.username}</div>
                </Link>
              ) : (
                <Link to={`/user/${post.User.username}`}>
                  <div className="username-overlay">{post.User.username}</div>
                </Link>
              )}
              
              <div className="likenumber">
                {post.like}
              </div>
              <div>
                <button className="like-button" onClick={() => handleLike(post.id)}>
                  <img src={likeImages[post.id] || likebuttonimage} alt="Like" />
                </button>
              </div>
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
      <img className="gri-image" src={griImage} alt="Gri Resim" />
    </div>
    
  );
};

export default Home;
