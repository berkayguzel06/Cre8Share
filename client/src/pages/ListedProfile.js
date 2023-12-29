import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ListedProfiles = () => {
  const location = useLocation();
  const { userSearchResults } = location.state || {};
  return (
    <div>
      <h2>Listed Users</h2>
      <ul>
        {userSearchResults && userSearchResults.map((user) => (
          <li key={user.id}>
            <Link to={`/profile/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListedProfiles;
