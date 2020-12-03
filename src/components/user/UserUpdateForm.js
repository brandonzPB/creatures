import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const UserUpdateForm = () => {
  const { user } = useContext(UserContext);

  if (!user.accessToken) {
    return (
      <Route exact path="/creature/info">
        <Redirect to="/" />
      </Route>
    )
  }

  /*
  username, email, password
  delete button
  form below
  */
  return (
    <div className="user-update-form"></div>
  )
}

export default UserUpdateForm;
