import React, { useState, useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import userService from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';
import './user.css';

const ForgotPassword = () => {
  const { reset, setReset } = useContext(UserContext);

  const [form, setForm] = useState({ email: '' });

  const [error, setError] = useState({ upset: false });

  const [loading, setLoading] = useState({ state: false });

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

    setLoading({
      ...loading,
      state: false
    });

    let emailExists;

   if (form.email.trim()) {
      emailExists = await userService.postResetRequest(form.email);
    } else {
      return setError({
        ...error,
        upset: true
      });
    }

    if (emailExists) {
      setLoading({
        ...loading,
        state: true
      });

      const resetToken = await userService.getResetCode(form.email);

      setReset({
        ...reset,
        resetToken: resetToken.reset_token,
        email: form.email
      });
    }
  }

  if (reset.resetToken.trim()) {
    return (
      <Route exact path="/user/reset/forgot">
        <Redirect to="/user/reset/code" />
      </Route>
    )
  }

  return (
    <div className="forgot-password-form">
      <Link to="/">
        <p className="return-home-link">Return Home</p>
      </Link>
      <div className="loading" style={{ display: loading.state ? 'flex' : 'none' }}>
        <span className="loading-text">Sending code...</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="email-forgot-input">
          <label>Enter Email: </label>
          <span className="forgot-info">Page will redirect once email has been sent</span>
          <input 
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{
              border: error.upset ? '2px solid red' : 'none'
            }}
          />
        </div>

        <button className="get-code-btn">Get Code</button>
      </form>
    </div>
  )
}

export default ForgotPassword;
