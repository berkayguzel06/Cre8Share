import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Helpers/UserContext.js';
import { useContext } from 'react';


const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { userData, setUserData } = useContext(UserContext);

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

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

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comment/${postId}`);
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const comment={
      content: newComment,
      userID: userData.id,
      postID: postId,
    }
    console.log(comment);
    try {
        // Assuming you have the user ID from somewhere, replace 'USER_ID' with the actual user ID
        const response = axios.post('http://localhost:5000/comment/create',comment).then((response) => {
          console.log(response);
          fetchComments();
        }, (error) => {
          console.log(error);
        });
        // Refetch comments after submitting a new comment
        
        // Clear the input field after submitting
        setNewComment('');
    } catch (error) {
        console.error('Error submitting comment:', error);
    }
};

const handleCommentDelete = async (commentID) => {
  try {
    console.log('Deleting comment with ID:', commentID);

    // Assuming you have the user ID from somewhere, replace 'USER_ID' with the actual user ID
    const response = await axios.delete(`http://localhost:5000/comment/${commentID}`);
    
    console.log("Deleted successfully");
    console.log(response);

    // Refetch comments after deleting a comment
    fetchComments();
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};
const handlePostDelete = async (postID) => {
  try {
    console.log('Deleting post with ID:', postID);

    // Assuming you have the user ID from somewhere, replace 'USER_ID' with the actual user ID
    const response = await axios.delete(`http://localhost:5000/post/${postID}`);
    
    console.log("Deleted successfully");
    console.log(response);

  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};



  if (!post) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>Post Details</h2>
      <p>Title: {post.title}</p>
      <img
        src={`data:image/png;base64,${arrayBufferToBase64(post.content)}`}
        alt={`Post ID: ${post.id}`}
      />

      {/* Comment input and submit button */}
      <div>
        <label htmlFor="comment">Make a Comment:</label>
        <input
          type="text"
          id="comment"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button onClick={handleCommentSubmit}>Submit</button>
        {userData.id === post.User.id && (
          <button onClick={() => handlePostDelete(post.id)}>Delete Post</button>
        )}
      </div>

      {/* Display comments */}
      <div>
        <h3>Comments</h3>
        {comments !== null && comments.length >= 0 ? (
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                {/* Display comment details as needed */}
                <p>User: {comment.User.username}</p>
                {comment.User.id === userData.id && (
                  <button onClick={() => handleCommentDelete(comment.id)}>Delete</button>
                )}
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default Post;