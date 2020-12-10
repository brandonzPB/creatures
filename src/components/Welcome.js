import React, { useEffect, useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import LoginForm from './user/LoginForm';
import { UserContext } from '../contexts/UserContext';
import './welcome.css';

const Welcome = () => {
  const { user, createResult, setCreateResult } = useContext(UserContext);

  useEffect(() => {
    setCreateResult({
      ...createResult,
      success: false
    });
  }, []);

  if (user.accessToken) {
    return (
      <Route exact path="/">
        <Redirect to="/user/update" />
      </Route>
    )
  }

  return (
    <div className="index-container">
      <div className="welcome">
        <LoginForm />

        <h1 className="create-account-text">Don't have an account?</h1>
        <Link to="/user/create">
          <p className="create-account-link">Create an Account</p>
        </Link>
      </div>
    </div>
  )
}

export default Welcome;
