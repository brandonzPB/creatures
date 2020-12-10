import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import userService from '../../services/userService';
import './user.css';

const ResetPassword = () => {
  const { reset, setReset } = useContext(UserContext);

  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({ upset: false });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError({
      ...error,
      upset: false
    });

    if (form.password.trim() && form.confirmPassword.trim()) {
      if (form.password === form.confirmPassword) {
        const userObject = {
          email: reset.email,
          password: form.password
        };

        const passwordReset = await userService.putPasswordReset(userObject, reset.resetToken);

        if (passwordReset === 'Complete') {
          setReset({
            ...reset,
            passwordReset: true
          });
        } 
      } else {
        return setError({
          ...error,
          upset: true
        });
      }
    } else {
      return setError({
        ...error,
        upset: true
      });
    }
  }
  
  const viewPassword = event => {
    event.preventDefault();

    return setShowPassword(!showPassword);
  }

  const cancelRequest = () => {
    setReset({
      ...reset,
      resetToken: '',
      email: '',
      code: '',
    });
  }

  if (!reset.resetToken || reset.passwordReset) {
    return (
      <Route exact path="/user/reset/password">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div className="reset-password-container">
      <button onClick={cancelRequest} className="cancel-reset-btn">Cancel Reset</button>

      <form onSubmit={handleSubmit}>
        <div className="password-input">
          <label>New Password: </label>
          <input 
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button className="show-password" onClick={viewPassword}>&#128065;</button>
        </div>

        <div className="confirm-password-input">
          <label>Confirm New Password: </label>
          <input 
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="submit-password-reset">
          <button className="submit-reset-btn" onClick={handleSubmit}>Reset Password</button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword;
