import React, { useState, useContext, useEffect } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { CreatureContext } from '../../contexts/CreatureContext';
import userService from '../../services/userService';
import './user.css';

const UserUpdateForm = () => {
  const { user, userDispatch, removeUser, } = useContext(UserContext);
  const { finish } = useContext(CreatureContext);

  useEffect(() => {
    // Update user (creatures now have different ages and streak counts)

    if (!user.updated) {
      userDispatch({ type: 'AUTO_UPDATE' });
      finish('db', null, 'creatures');
      console.log('Streaks and ages updated', user);
    }
  }, []);

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
    const { name, value, className } = event.target;

    if (className === 'delete-user') {
      return setDeleteUser({
        ...deleteUser,
        confirmDeletePassword: value
      });
    }

    setUpdate({
      ...update,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError({
      ...error,
      ref: '',
    });

    let username;
    let email;
    let password;

    if (!update.username.trim() && !update.email.trim() && !update.password.trim()) {
      return false;
    }

    if (update.username.trim()) {
      if (update.username !== user.username) {
        const userExists = await userService.checkUsername('username', update.username, user, user.accessToken).then(res => res);

        if (userExists !== 'Available') {
          console.log('Username is already taken');

          return setError({
            ...error,
            ref: 'username'
          });
        } else {
          console.log('Username is available');
          username = update.username;
        }
      } else {
        username = update.username;
      }
    } else {
      username = user.username;
    }

    if (update.email.trim()) {
      if (update.email !== user.email) {
        const emailExists = await userService.checkUsername('email', update.email, user, user.accessToken).then(res => res);

        if (emailExists !== 'Available') {
          console.log('Email is already taken');

          return setError({
            ...error,
            ref: 'email'
          });
        } else {
          console.log('Email is available');
          email = update.email;
        }
      } else {
        email = update.email;
      }
    } else {
      email = user.email;
    }

    if (update.password.trim()) {
      if (update.password !== update.confirmPassword) {
        return setError({
          ...error,
          ref: 'password'
        });
      } else {
        password = update.password;
      }
    } else {
      password = user.password;
    }

    if (update.email.trim() !== update.confirmEmail) {
      return setError({
        ...error,
        ref: 'email'
      });
    }

    userDispatch({ type: 'UPDATE_USER', user: {
      username, email, password
    }});

    if (password !== user.password) finish('db', null, 'updatePassword');
    else finish('db', null, 'update');

    setUpdate({
      ...update,
      username: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    });
  }

  const sendDelete = event => {
    event.preventDefault();

    if (!deleteUser.confirmDelete) {
      return setDeleteUser({
        ...deleteUser,
        confirmDelete: true,
        confirmDeletePassword: '',
      });
    }

    if (deleteUser.confirmDeletePassword === user.password) {
      removeUser();

      finish('db', null, 'delete');
    }
  }

  const viewPassword = (event) => {
    event.preventDefault();

    setShowPassword(!showPassword);
  }

  return (
    <div className="user-info">
      <Link to="/creatures">
        <p className="view-creatures-link">View Creatures</p>
      </Link>

      <div className="user-update-form">
        <form onSubmit={handleSubmit}>
          <span className="form-title">Edit User Info</span>
          <span className="user-info-tip">Leave any field blank if you don't want to change it</span>

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

          <div className="email-input">
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

          <div className="password-input first-password-input">
            <input 
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={update.password}
              onChange={handleChange}
              style={{
                border: error.ref === 'password' ? '2px solid red' : 'none'
              }}
            />
            <button className="show-password-btn" onClick={viewPassword}>&#128065;</button>
          </div>

          <div className="password-label">
            <label>Confirm New Password: </label>
          </div>

          <div className="password-input">
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

          <div className="update-user-btn-container">
            <button onClick={handleSubmit} className="update-user-btn">Update User</button>
          </div>
        </form>
      </div>

      <div className="delete-user-container">
        <div className="delete-user-btn-container">
          <span className="delete-title">Delete User</span>
          <button className="delete-user-btn" onClick={sendDelete}>Delete User</button>
        </div>

        <div className="confirm-delete" style={{ display: deleteUser.confirmDelete ? 'flex' : 'none' }}>
          <label>Please enter your password to confirm</label>
          <input 
            type="password"
            name="confirmDeletePassword"
            className="delete-user"
            value={deleteUser.confirmDeletePassword}
            onChange={handleChange}
            style={{
                  border: error.ref === 'delete' ? '2px solid red' : 'none'
            }}
          />
          <button className="confirm-delete-user-btn" onClick={sendDelete}>Confirm Delete</button>
        </div>
      </div>
    </div>
  )
}

export default UserUpdateForm;
