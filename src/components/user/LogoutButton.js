import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const LogoutButton = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="logout-container">
      {
        user.accessToken ?
          <div className="logout-btn">
            <button onClick={logout}>Log Out</button>
          </div> :
          <div className="empty"></div>
      }
    </div>
  )
}

export default LogoutButton;
