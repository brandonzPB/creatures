import React, { useState, useEffect, useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import LoginForm from './user/LoginForm';
import { UserContext } from '../contexts/UserContext';
import { CreatureContext } from '../contexts/CreatureContext';

const Welcome = () => {
  const { user, error, setError } = useContext(UserContext);
  const { creatures } = useContext(CreatureContext);

  useEffect(() => {
    setError({
      ...error,
      error: null
    });
  }, []);

  if (user.accessToken) {
    return (
      <Route exact path="/">
        <Redirect to="/user" />
      </Route>
    )
  }

  return (
    <div className="index-container">
      {
        error === true ?
          <Route exact path="/">
            <Redirect to="/user/create" />
          </Route> :

          <div className="welcome">
            <LoginForm />

            <h1>Don't have an account?</h1>
            <Link to="/user/create">
              <p>Create an Account</p>
            </Link>
          </div>
      }
    </div>
  )
}

export default Welcome;
