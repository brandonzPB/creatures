import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, Route, Redirect } from 'react-router-dom';
import userService from '../../services/userService';

const UserCreateForm = () => {
  const { createResult, setCreateResult } = useContext(UserContext);

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
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
      <div className="create-user-form-container">
        {
          createResult.success ?
            <Route exact path="/user/create">
              <Redirect to="/" />
            </Route> :
            <div className="create-form">
              <Link to="/">
                <p>Return Home</p>
              </Link>

              <div className="username-err" style={{ display: error.ref === 'username' ? 'flex' : 'none'}}>
                <h2>Username already exists</h2>
              </div>
              <div className="email-err" style={{ display: error.ref === 'email' ? 'flex' : 'none'}}>
                <h2>Email already exists</h2>
              </div>

              <div className="create-user-form">
                <form onSubmit={handleSubmit}>
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
                
                  <div className="create-user-btn">
                    <button>Create User</button>
                  </div>
                </form>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default UserCreateForm;
