import React, { useState } from 'react';
import userService from '../../services/userService';

const ResetPassword = () => {
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

  const handleSubmit = event => {
    event.preventDefault();

    setError({
      ...error,
      upset: false
    });

    setForm({
      ...form,
      password: '',
      confirmPassword: ''
    });
  }
  
  const viewPassword = event => {
    event.preventDefault();

    return setShowPassword(!showPassword);
  }

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit}>
        <div className="password-input">
          <label>New Password: </label>
          <input 
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button onClick={viewPassword}>&#128065;</button>
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
          <button onClick={handleSubmit}>Reset Password</button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword;
