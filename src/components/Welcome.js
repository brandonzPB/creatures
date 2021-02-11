import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginForm from './user/LoginForm';
import { UserContext } from '../contexts/UserContext';
import './welcome.css';

const Welcome = () => {
  const { user, createResult, setCreateResult, link, setDest } = useContext(UserContext);

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

  if (link.dest === 'create') {
    return (
      <Route exact path="/">
        <Redirect to="/user/create" />
      </Route>
    )
  }

  return (
    <div className="index-container">
      <div className="welcome">
        <LoginForm />

        <h1 className="create-account-text">Don't have an account?</h1>
        <button className="create-account-link" onClick={() => setDest('create')}>Create an Account</button>
      </div>
    </div>
  )
}

export default Welcome;
