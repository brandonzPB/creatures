import React, { useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { CreatureContext } from '../../contexts/CreatureContext';
import { UserContext } from '../../contexts/UserContext';

const User = () => {
  const { user, userDispatch, refreshUser } = useContext(UserContext);
  const { creatures, finish } = useContext(CreatureContext);

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

  return (
    <div className="user-container">
      <button onClick={sendRefresh}>View Creatures</button>
      <Link to="/user/update">Edit User Info</Link>
    </div>
  )
}

export default User;
