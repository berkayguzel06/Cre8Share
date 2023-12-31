import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import GuestPage from './pages/GuestPage.js';
import CreatePost from './pages/CreatePost.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';
import Post from './pages/Post.js';
import User from './pages/User.js';
import ListedProfiles from './pages/ListedProfiles.js';
import ImageGenerator from './pages/ImageGenerator.js';
import Admin from './pages/Admin.js';
import { UserProvider } from './Helpers/UserContext.js'; // Update the path

function App() {
  return (
    <div className="App">
      <Router>
        <Link id="title" to="/"></Link>
        {/* Wrap your entire application with UserProvider */}
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="/ListedProfiles" element={<ListedProfiles />} />
            <Route path="/ImageGenerator" element={<ImageGenerator />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
