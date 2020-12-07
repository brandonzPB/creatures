import React, { useState, useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import userService from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';

const ForgotPassword = () => {
  const { reset, setReset } = useContext(UserContext);

  const [form, setForm] = useState({ email: '' });

  const [error, setError] = useState({ upset: false });

  const [codeSent, setCodeSent] = useState(false);

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
      const resetToken = await userService.getResetCode(form.email);
      
      setReset({
        ...reset,
        resetToken: resetToken.reset_token
      });

      setCodeSent(!codeSent);
    }
  }

  if (codeSent) {
    return (
      <Route exact path="/user/reset/forgot">
        <Redirect to="/user/reset/code" />
      </Route>
    )
  }

  return (
    <div className="forgot-password-form">
      <Link to="/">Return Home</Link>
      <form onSubmit={handleSubmit}>
        <div className="email-input">
          <label>Enter Email: </label>
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

        <div className="get-reset-code">
          <button>Get Code</button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword;
