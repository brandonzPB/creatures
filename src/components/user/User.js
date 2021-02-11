import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import './user.css';

const User = () => {
  const { user, refreshUser, link, setDest } = useContext(UserContext);

  const sendRefresh = () => {
    refreshUser();
  }

  if (!user.accessToken) {
    return (
      <Route exact path="/user">
        <Redirect to="/" />
      </Route>
    )
  }

  if (user.refreshed) {
    return (
      <Route exact path="/user">
        <Redirect to="/creatures" />
      </Route>
    )
  }

  if (link.dest === 'userUpdate') {
    return (
      <Route exact path="/user">
        <Redirect to="/user/update" />
      </Route>
    )
  }

  return (
    <div className="user-container">
      <button className="view-creatures-btn" onClick={sendRefresh}>View Creatures</button>

      <button className="edit-user-link" onClick={() => setDest('userUpdate')}>Edit User Info</button>
    </div>
  )
}

export default User;
