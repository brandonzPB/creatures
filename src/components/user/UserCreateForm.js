import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, Route, Redirect } from 'react-router-dom';
import userService from '../../services/userService';
import './user.css';

const UserCreateForm = () => {
  const { createResult, setCreateResult } = useContext(UserContext);

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({ ref: '' });

  const handleChange = event => {
    const { name, value } = event.target;

    setNewUser({
      ...newUser,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError({
      ...error,
      ref: ''
    });

    if (newUser.username.trim() && newUser.email.trim() && newUser.password.trim()) {
      if (newUser.password !== newUser.confirmPassword) {
        return setError({
          ...error,
          ref: 'password'
        });
      }

      const result = await userService.createUser(newUser);

      if (result.result === 'Success') {
        return setCreateResult({
          ...createResult,
          success: true
        });
      } else if (result.result === 'Email error') {
        return setError({
          ...error,
          ref: 'email'
        });
      } else if (result.result === 'Username error') {
        return setError({
          ...error,
          ref: 'username'
        });
      }
    }
  }

  if (createResult.success) {
    return (
      <Route exact path="/user/create">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div className="user-create-page">
      {
          createResult.success ?
            <Route exact path="/user/create">
              <Redirect to="/" />
            </Route> :
            <div className="create-user-form-container">
              <Link to="/">
                <p className="return-home-link">Return Home</p>
              </Link>

              <div className="username-err" style={{ display: error.ref === 'username' ? 'flex' : 'none'}}>
                <span className="create-error-text">Username already exists</span>
              </div>
              <div className="email-err" style={{ display: error.ref === 'email' ? 'flex' : 'none'}}>
                <span className="create-error-text">Email already exists</span>
              </div>
              <div className="password-err" style={{ display: error.ref === 'password' ? 'flex' : 'none'}}>
                <span className="create-error-text">Passwords Do Not Match</span>
              </div>

              <div className="create-user-form">
                <form onSubmit={handleSubmit}>
                  <span className="create-user-title">Create a New User</span>
                  <div className="username-create">
                    <label>Username: </label>
                    <input 
                      type="text"
                      name="username"
                      value={newUser.username}
                      required={true}
                      minLength={2}
                      onChange={handleChange}
                      style={{
                        border: error.ref === 'username' ? '2px solid red' : 'none'
                      }}
                    />
                  </div>

                  <div className="email-create">
                    <label>Email: </label>
                    <input 
                      type="email"
                      name="email"
                      value={newUser.email}
                      required={true}
                      onChange={handleChange}
                      style={{
                        border: error.ref === 'email' ? '2px solid red' : 'none'
                      }}
                    />
                  </div>
                  
                  <div className="password-create">
                    <label>Password: </label>
                    <input 
                      type="password"
                      name="password"
                      value={newUser.password}
                      required={true}
                      minLength={5}
                      onChange={handleChange}
                      style={{
                        border: error.ref === 'password' ? '2px solid red' : 'none'
                      }}
                    />
                  </div>

                  <div className="confirm-password-create">
                    <label>Confirm Password: </label>
                    <input 
                      type="password"
                      name="confirmPassword"
                      value={newUser.confirmPassword}
                      required={true}
                      minLength={5}
                      onChange={handleChange}
                      style={{
                        border: error.ref === 'password' ? '2px solid red' : 'none'
                      }}
                    />
                  </div>
                
                  <div className="create-user-btn-container">
                    <button className="create-user-btn">Create User</button>
                  </div>
                </form>
              </div>
            </div>
        }
    </div>
  )
}

export default UserCreateForm;
