import React, { useState, useReducer, createContext, useEffect } from 'react';
import userService from '../services/userService';
import userReducer from '../reducers/userReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, {}, () => {
    const storedUser = localStorage.getItem('my-user');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [error, setError] = useState({ error: null });

  useEffect(() => {
    localStorage.setItem('my-user', JSON.stringify(user));

    console.log(user);
  }, [user]);

  const addUser = async (userObject) => {

    userService.createUser(userObject)
      .then(res => {
        if (res === false) {
          setError({
            ...error,
            error: true
          });
        } else {
          setError({
            ...error,
            error: null
          });
        }
      })
      .catch(err => console.error(err));
  }

  const getLocalCreatures = () => {
    const creatureStorage = localStorage.getItem('my-creatures');
    
    return creatureStorage ? JSON.parse(creatureStorage) : null;
  }

  const getUserInfo = async (res) => {
    console.log('Successfully logged in', res.db_id, res.accessToken);

    const storedCreatures = await getLocalCreatures();

    console.log('Retrieved localStorage creatures');

    userService.readUser(res.db_id, res.accessToken)
      .then(response => {

        dispatch({ type: 'LOG_IN', user: {
          username: response.username,
          email: response.email,
          db_id: res.db_id,
          accessToken: res.accessToken,
        }});

        console.log('Successfully retrieved user data');
      })
      .catch(err => console.err(err));
  }

  const login = async (userObject) => {
    const { username, password } = userObject;

    await userService.login({
      username,
      password
    })
      .then(res => { 
        return getUserInfo(res); 
      })
      .catch(err => {
        console.error(err);
      });
  }

  const deleteUser = userObject => {}

  return (
    <UserContext.Provider value={{
      user,
      error,
      setError,
      addUser,
      login,
      deleteUser,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
