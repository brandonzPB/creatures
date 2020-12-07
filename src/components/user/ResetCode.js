import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import userService from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';

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
      console.log('codeMatches', codeMatches);
      return;
    } else {
      setError({
        ...error,
        upset: true
      });
    }

    setForm({
      ...form,
      code: ''
    });
  }

  const renewCode = async () => {
    const resetToken = await userService.getResetCode(reset.email);

    setReset({
      ...reset,
      resetToken: resetToken.reset_token
    });
  }

  if (reset.codeSent) {
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
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
          style={{
            border: error.upset ? '2px solid red' : 'none'
          }}
        />
        <button>Submit Code</button>
      </form>

      <div className="resend-code">
        <span className="resend-code-text">Need a new code?</span>
        <button onClick={renewCode}>Resend Code</button>
      </div>
    </div>
  )
}

export default ResetCode;
