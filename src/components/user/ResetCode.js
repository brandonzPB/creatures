import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import userService from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';

const ResetCode = () => {
  const { reset } = useContext(UserContext);

  const [reset, setReset] = useState({ code: '' });

  const [error, setError] = useState({ upset: false });

  /*
  show option to resend code
  */

  const handleChange = event => {
    const { name, value } = event.target;

    setReset({
      ...reset,
      [name]: value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();

    setError({
      ...error,
      upset: false
    });

    setReset({
      ...reset,
      code: ''
    });
  }

  const renewCode = () => {}

  if (reset.passwordReset) {
    return (
      <Route exact path="/user/reset/code">
        <Redirect to="/user/reset/password" />
      </Route>
    )
  }

  return (
    <div className="reset-code-form">
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="code"
          value={reset.code}
          onChange={handleChange}
        />
        <button>Submit Code</button>
      </form>

      <button onClick={renewCode}>Need a new code?</button>
    </div>
  )
}

export default ResetCode;
