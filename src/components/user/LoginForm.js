import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const LoginForm = () => {
  const { login } = useContext(UserContext);

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();

    login(user);

    setUser({
      ...user,
      username: '',
      password: ''
    });
  }

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input 
          type="text"
          name="username"
          value={user.username}
          required={true}
          onChange={handleChange}
        />
        <br />
        <label>Password: </label>
        <input 
          type="password"
          name="password"
          value={user.password}
          required={true}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginForm;
