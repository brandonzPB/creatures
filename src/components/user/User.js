import React, { useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { CreatureContext } from '../../contexts/CreatureContext';
import { UserContext } from '../../contexts/UserContext';

const User = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { creatures } = useContext(CreatureContext);

  if (!user.accessToken) {
    return (
      <Route exact path="/user">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div className="user-container">
      <Link to="/creatures">View Creatures</Link>
      <Link to="/user/update">Edit User Info</Link>
    </div>
  )
}

export default User;
