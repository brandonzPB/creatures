import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import userService from '../../services/userService';
import './user.css';

const LoginForm = () => {
  const { getUserInfo } = useContext(UserContext);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState({ ref: '' });

  const handleChange = event => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError({
      ...error,
      ref: ''
    });

    let loginResult;

    if (user.username.trim()) {
      loginResult = await userService.login('username', user);
      console.log('loginResult', loginResult);
    } else if (user.email.trim()) {
      loginResult = await userService.login('email', user);
      console.log('loginResult', loginResult);
    } else if (!user.username.trim()) {
      return setError({
        ...error,
        ref: 'username'
      });
    } else if (!user.email.trim()) {
      return setError({
        ...error,
        ref: 'email'
      });
    }

    if (loginResult.result === 'Success') {
      localStorage.removeItem('my-reset');
      localStorage.removeItem('my-user');

      getUserInfo(loginResult, user.password);
    } else if (loginResult.result === 'Username error') {
      return setError({
        ...error,
        ref: 'username'
      });
    } else if (loginResult.result === 'Email error') {
      return setError({
        ...error,
        ref: 'email'
      });
    } else if (loginResult.result === 'Password error') {
      return setError({
        ...error,
        ref: 'password'
      });
    }
  }

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <span className="login-title">Login</span>
        <div className="username-login">
          <label>Username: </label>
          <input 
            type="text"
            name="username"
            value={user.username}
            required={!user.email.trim()}
            onChange={handleChange}
            style={{
              border: error.ref === 'username' ? '2px solid red' : 'none'
            }}
          />
        </div>

        <div className="email-login">
          <label>or Email: </label>
          <input 
            type="text"
            name="email"
            value={user.email}
            required={!user.username.trim()}
            onChange={handleChange}
            style={{
              border: error.ref === 'email' ? '2px solid red' : 'none'
            }}
          />
        </div>

        <div className="password-login">
          <label>Password: </label>
          <input 
            type="password"
            name="password"
            value={user.password}
            required={true}
            onChange={handleChange}
            style={{
              border: error.ref === 'password' ? '2px solid red' : 'none'
            }}
          />
        </div>

        <Link to="/user/reset/forgot">
          <p className="forgot-password-link">Forgot Password?</p>
        </Link>

        <button className="login-btn">Login</button>
      </form>
    </div>
  )
}

export default LoginForm;
