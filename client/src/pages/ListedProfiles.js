import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/ListedProfiles.css';
import Header from './Header';
import profileImage from '../images/pp.png';
import profileBanner from '../images/gri.png';

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
        <h2 style={{marginTop:'77px' , marginLeft: '5px' }}>Listed Users</h2>
        <div className="profiless-frame">
          <ul className="profiless-list">
            {userSearchResults &&
              userSearchResults.map((user) => (
                <li key={user.id} className="profiless-item">
                  <Link to={`/user/${user.username}`}>
                    <div className="profiless-info">
                    
                      <div className="profiless-details">
                        {user.pfp ? (
                          <img
                            src={`data:image/png;base64,${arrayBufferToBase64(
                              user.pfp
                            )}`}
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
                      </div>
                      {user.banner ? (
                        <img
                          src={`data:image/png;base64,${arrayBufferToBase64(
                            user.banner
                          )}`}
                          className="profiless-banner"
                        />
                      ) : (
                        <img
                          src={profileBanner}
                          className="profiless-banner"
                          alt="Default Banner"
                        />
                      )}
                    </div>
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
