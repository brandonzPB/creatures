import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, Route, Redirect } from 'react-router-dom';

const UserCreateForm = () => {
  const { addUser, error, setError, } = useContext(UserContext);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addUser(newUser);

    setNewUser({
      ...newUser,
      username: '',
      email: '',
      password: '',
    });
  }

  return (
    <div className="user-create-page">
      <div className="create-user-form-container">
        {
          error.error === false ?
            <Route exact path="/user/create">
              <Redirect to="/" />
            </Route> :
            <div className="create-form">
            {
              error.error === true ?
                <div className="top-container">
                  <button onClick={() => {setError({ ...error, error: false })}}>Return Home</button> 
                  <h2>Email already exists</h2>
                </div> :
                <Link to="/">
                  <p>Return Home</p>
                </Link>
            }

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
          </div>
        }
      </div>
    </div>
  )
}

export default UserCreateForm;
