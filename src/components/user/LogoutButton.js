import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { CreatureContext } from '../../contexts/CreatureContext';
import './user.css';

const LogoutButton = () => {
  const { user, logout } = useContext(UserContext);
  const { dispatch } = useContext(CreatureContext);

  const sendLogout = () => {
    dispatch({ type: 'LOG_OUT' });
    logout();
  }

  return (
    <div className="logout-container">
      {
        user.accessToken ?
          <div className="logout-btn-container">
            <button className="logout-btn" onClick={sendLogout}>Log Out</button>
          </div> :
          <div className="empty"></div>
      }
    </div>
  )
}

export default LogoutButton;
