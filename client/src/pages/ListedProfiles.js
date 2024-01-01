import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/ListedProfiles.css';
import Header from './Header';
import profileImage from '../images/pp.png';

const ListedProfiles = () => {
  const location = useLocation();
  const { userSearchResults } = location.state || {};

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer.data).reduce(
      (binaryString, byte) => binaryString + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binary);
  };

  return (
    <div>
      <Header />
      <div className="listed-profiless-container">
        <h2 style={{ marginBottom: '15px' }}>Listed Users</h2>
        <div className="profiless-frame">
          <ul className="profiless-list">
            {userSearchResults &&
              userSearchResults.map((user) => (
                <li key={user.id} className="profiless-item">
                  <Link to={`/user/${user.username}`}>
                    {user.pfp ? (
                      <img
                        src={`data:image/png;base64,${arrayBufferToBase64(user.pfp)}`}
                        className="profiless-image"
                      />
                    ) : (
                      <img
                        src={profileImage}
                        className="profiless-image"
                        alt="Default Profile Picture"
                      />
                    )}
                    <span className="profiless-username">{user.username}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListedProfiles;
