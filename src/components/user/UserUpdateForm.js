import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import ConfirmDisplay from '../ConfirmDisplay';

const UserUpdateForm = () => {
  const { user, userDispatch } = useContext(UserContext);

  const [update, setUpdate] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const [deleteUser, setDeleteUser] = useState({ confirmDelete: '' });

  if (!user.accessToken) {
    return (
      <Route exact path="/creature/info">
        <Redirect to="/" />
      </Route>
    )
  }

  const handleChange = event => {
    const { name, value } = event.target;

    setUpdate({
      ...update,
      [name]: value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();

    setUpdate({
      ...update,
      username: '',
      email: '',
      password: '',
    });
  }

  const returnHome = () => {}

  const sendDelete = () => {}

  /*
  return home button
  confirm email
  confirm password
  click to view password
  delete button
  
  */

  return (
    <div className="user-info">
      <button onClick={returnHome}>Return Home</button>

      <div className="user-update-form">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Edit User Info</h2>

          <div className="username-label">
            <label for="username">Username: </label>
          </div>

          <div className="username-input">
            <input 
              type="text"
              name="username"
              value={update.username}
              onChange={handleChange}
              placeholder={user.username}
            />
          </div>

          <div className="email-label">
            <label for="email">Email: </label>
          </div>

          <div className="email-input">
            <input 
              type="email"
              name="email"
              value={update.email}
              onChange={handleChange}
              placeholder={user.email}
            />
          </div>

          <div className="email-label">
            <label for="confirm-email">Confirm email: </label>
          </div>

          <div className="confirm-email-input">
            <input 
              type="email"
              name="confirmEmail"
              value={update.confirmEmail}
              onChange={handleChange}
            />
          </div>

          <div className="password-label">
            <label for="password">Password: </label>
          </div>

          <div className="password-input">
            <input 
              type="password"
              name="password"
              value={update.password}
              onChange={handleChange}
            />
          </div>

          <div className="password-label">
            <label for="confirm-password">Confirm Password: </label>
          </div>

          <div className="confirm-password-input">
            <input 
              type="password"
              name="confirmPassword"
              value={update.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button className="submit-form-btn">Update User</button>
        </form>
      </div>

      <button onClick={sendDelete}>Delete User</button>
      <div className="confirm-delete">
        <label for="confirm-delete">Please enter your password to confirm</label>
        <input 
          type="password"
          name="confirmDelete"
          value={deleteUser.confirmDelete}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default UserUpdateForm;
