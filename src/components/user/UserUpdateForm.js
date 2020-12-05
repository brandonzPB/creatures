import React, { useState, useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { CreatureContext } from '../../contexts/CreatureContext';
import ConfirmDisplay from '../ConfirmDisplay';
import userService from '../../services/userService';

const UserUpdateForm = () => {
  const { user, userDispatch, removeUser, checkUsername } = useContext(UserContext);
  const { finish } = useContext(CreatureContext);

  const [update, setUpdate] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({ ref: '' });
  
  const [deleteUser, setDeleteUser] = useState({
    confirmDelete: false,
    confirmDeletePassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!user.accessToken) {
    return (
      <Route exact path="/user/update">
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

    let username;
    let email;
    let password;

    if (!update.username.trim() && !update.email.trim() && !update.password.trim()) {
      return false;
    }

    if (update.username.trim()) {
      const usernameIsFree = checkUsername();

      if (!usernameIsFree) {
        return setError({
          ...error,
          ref: 'username'
        });
      }
    }

    if (update.email.trim()) {
      if (update.email !== update.confirmEmail) {
        return setError({
          ...error,
          ref: 'email'
        });
      }
    }

    if (update.password.trim()) {
      if (update.password !== update.confirmPassword) {
        return setError({
          ...error,
          ref: 'password'
        });
      }
    }

    username = !update.username.trim() || update.username === user.username
      ? user.username
      : update.username;

    email = !update.email.trim() || update.email === user.email
      ? user.email
      : update.email;
    
    password = !update.password.trim() || update.password === user.password
      ? user.password
      : update.password;

    userDispatch({ type: 'UPDATE_USER', user: {
      username, email, password
    }});

    finish('db');

    setUpdate({
      ...update,
      username: '',
      email: '',
      password: '',
    });
  }

  const returnHome = () => {}

  const sendDelete = () => {
    if (deleteUser.confirmDelete) {
      return setDeleteUser({
        ...deleteUser,
        confirmDelete: true
      });
    }

    if (deleteUser.confirmDeletePassword === user.password) {
      deleteUser();
      // deletes localStorage too
    }
  }

  const viewPassword = (event) => {
    event.preventDefault();

    setShowPassword(!showPassword);
  }

  /*
  check if password already exists
  delete user
  */

  return (
    <div className="user-info">
      <Link to="/creatures">View Creatures</Link>

      <div className="user-update-form">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Edit User Info</h2>
          <span className="user-info-tip">Leave it blank if you don't want to change it</span>

          <div className="username-label">
            <label>New Username: </label>
          </div>

          <div className="username-input">
            <input 
              type="text"
              name="username"
              minLength={2}
              value={update.username}
              onChange={handleChange}
              placeholder={user.username}
              style={{
                border: error.ref === 'username' ? '2px solid red' : 'none'
              }}
            />
          </div>

          <div className="email-label">
            <label>New Email: </label>
          </div>

          <div className="email-input">
            <input 
              type="email"
              name="email"
              value={update.email}
              onChange={handleChange}
              placeholder={user.email}
              style={{
                border: error.ref === 'email' ? '2px solid red' : 'none'
              }}
            />
          </div>

          <div className="email-label">
            <label>Confirm New Email: </label>
          </div>

          <div className="confirm-email-input">
            <input 
              type="email"
              name="confirmEmail"
              value={update.confirmEmail}
              onChange={handleChange}
              style={{
                border: error.ref === 'email' ? '2px solid red' : 'none'
              }}
            />
          </div>

          <div className="password-label">
            <label>New Password: </label>
          </div>

          <div className="password-input">
            <input 
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={update.password}
              onChange={handleChange}
              style={{
                border: error.ref === 'password' ? '2px solid red' : 'none'
              }}
            />
            <button onClick={viewPassword}>&#128065;</button>
          </div>

          <div className="password-label">
            <label>Confirm New Password: </label>
          </div>

          <div className="confirm-password-input">
            <input 
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={update.confirmPassword}
              onChange={handleChange}
              style={{
                border: error.ref === 'password' ? '2px solid red' : 'none'
              }}
            />
          </div>

          <button onClick={handleSubmit} className="submit-form-btn">Update User</button>
        </form>
      </div>

      <button onClick={sendDelete}>Delete User</button>
      <div className="confirm-delete" style={{ display: deleteUser.confirmDelete ? 'flex' : 'none' }}>
        <label>Please enter your password to confirm</label>
        <input 
          type="password"
          name="confirmDelete"
          value={deleteUser.confirmDelete}
          onChange={handleChange}
          style={{
                border: error.ref === 'delete' ? '2px solid red' : 'none'
          }}
        />
      </div>
    </div>
  )
}

export default UserUpdateForm;
