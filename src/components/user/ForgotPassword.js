import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  /*
  enter email and receive reset code
  enter code
  if correct, redirect to ResetPassword
  */

  return (
    <Link to="/user/reset/password">Forgot Password?</Link>
  )
}

export default ForgotPassword;
