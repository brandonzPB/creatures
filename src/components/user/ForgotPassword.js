import React, { useState } from 'react';
import userService from '../../services/userService';

const ForgotPassword = () => {
  /*
  enter email and receive reset code via email
  if correct, redirect to reset code form
  */

  const [form, setForm] = useState({ email: '' });

  const [error, setError] = useState({ upset: false });

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

   if (form.email.trim()) {
      const emailExists = await userService.getResetCode(form.email);

      console.log('emailExists', emailExists)
    } else {
      return setError({
        ...error,
        upset: true
      });
    }

    return;

    setForm({
      ...form,
      username: '',
      email: '',
    });
  }

  return (
    <div className="forgot-password-form">
      <form onSubmit={handleSubmit}>
        <div className="username-input">
          <label>Username: </label>
          <input 
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        </div>

        <div className="email-input">
          <label>Or Email: </label>
          <input 
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="get-reset-code">
          <button>Get Code</button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword;
