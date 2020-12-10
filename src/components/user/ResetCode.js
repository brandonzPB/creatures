import React, { useState, useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import userService from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';
import './user.css';

const ResetCode = () => {
  const { reset, setReset } = useContext(UserContext);

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

  return (
    <div className="reset-code-form">
      <Link to="/">
        <p className="return-home-link">Return Home</p>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>Enter code below: </label>
        <input 
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

      <div className="resend-code">
        <span className="resend-code-text">Need a new code?</span>
      </div>
      <button onClick={renewCode} className="resend-code-btn">Resend Code</button>
    </div>
  )
}

export default ResetCode;
