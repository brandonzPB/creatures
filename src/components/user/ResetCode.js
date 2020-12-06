import React, { useState } from 'react';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

const ResetCode = () => {
  /*
  enter email and receive reset code
  enter code
  if correct, redirect to ResetPassword
  */

  const [form, setForm] = useState({
    username: '',
    email: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();

    setForm({
      ...form,
      username: '',
      email: '',
    });
  }

  return (
    <div className="reset-code">
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

export default ResetCode;
