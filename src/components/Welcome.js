import React, { useEffect, useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import LoginForm from './user/LoginForm';
import { UserContext } from '../contexts/UserContext';

const Welcome = () => {
  const { thisUser } = useContext(UserContext);

  return (
    <div className="index-container">
      {
        thisUser.isLoggedIn ? 
          <Route exact path="/">
            <Redirect to="/creatures" />
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
