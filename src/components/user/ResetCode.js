import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import userService from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';

import './user.css';
import './resetCode.css';

const ResetCode = () => {
  const { reset, setReset, link, setDest } = useContext(UserContext);

  const [form, setForm] = useState({ code: '' });

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

    if (form.code.trim()) {
      const codeMatches = await userService.postResetCode(form.code, reset.resetToken);

      if (codeMatches) {
        return setReset({
          ...reset,
          code: form.code
        });
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

  const renewCode = async () => {
    const resetToken = await userService.getResetCode(reset.email);

    setReset({
      ...reset,
      resetToken: resetToken.reset_token
    });
  }

  if (reset.code) {
    return (
      <Route exact path="/user/reset/code">
        <Redirect to="/user/reset/password" />
      </Route>
    )
  }

  if (!reset.resetToken) {
    return (
      <Route exact path="/user/reset/code">
        <Redirect to="/" />
      </Route>
    )
  }

  if (link.dest === 'home') {
    return (
      <Route exact path="/user/reset/code">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div className="reset-code-container">
      <button className="return-home-link" onClick={() => setDest('home')}>Return Home</button>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <span className="form-header">Enter code below: </span>
          <input 
            id="input"
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            style={{
              border: error.upset ? '2px solid red' : 'none'
            }}
          />
          <button className="submit-code-btn">Submit Code</button>
        </form>
      </div>

      <div className="resend-code-container">
        <span className="resend-code-text">Need a new code?</span>
        <button onClick={renewCode} className="resend-code-btn">Resend Code</button>
      </div>
    </div>
  )
}

export default ResetCode;
