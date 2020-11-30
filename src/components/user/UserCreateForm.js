import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, Route, Redirect } from 'react-router-dom';

const UserCreateForm = () => {
  const { signup, toggleSignup, addUser } = useContext(UserContext);

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setNewUser({
      ...newUser,
      [name]: value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();

    addUser(newUser);

    setNewUser({
      username: '',
      email: '',
      password: '',
    });

    toggleSignup();
  }

  return (
    <div className="user-create-page">
      {
        signup ?
          <div className="create-user-form-container">
            <Link to="/">
              <p>Return Home</p>
            </Link>

            <div className="create-user-form">
              <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input 
                  type="text"
                  name="username"
                  value={newUser.username}
                  required={true}
                  minLength={2}
                  onChange={handleChange}
                />
                <br />
                <label>Email: </label>
                <input 
                  type="email"
                  name="email"
                  value={newUser.email}
                  required={true}
                  minLength={5}
                  onChange={handleChange}
                />
                <br />
                <label>Password: </label>
                <input 
                  type="password"
                  name="password"
                  value={newUser.password}
                  required={true}
                  minLength={5}
                  onChange={handleChange}
                />
                <button>Create User</button>
              </form>
            </div>
          </div> :
          <Route exact path="/user/create">
            <Redirect to="/"/>
          </Route>
      }
    </div>
  )
}

export default UserCreateForm;
