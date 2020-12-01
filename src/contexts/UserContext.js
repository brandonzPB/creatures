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

    console.log('user', user);
    console.log(user.accessToken);
  }, [user]);

  // POST new user
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

  // GET localStorage creatures
  const getLocalCreatures = () => {
    const creatureStorage = localStorage.getItem('my-creatures');
    
    return creatureStorage ? JSON.parse(creatureStorage) : [];
  }

  // POST localStorage creatures
  const postLocalCreatures = async (userId, creatures, token) => {
    await userService
      .storeLocalCreatures(userId, creatures, token)
      .then(res => res)
      .catch(err => console.error(err));
  }

  // GET user info
  const getUserInfo = async (res) => {
    console.log('Successfully logged in', res.db_id, res.accessToken);

    const storedCreatures = await getLocalCreatures();

    console.log(storedCreatures);

    if (storedCreatures.length >= 1) {
      postLocalCreatures(res.db_id, storedCreatures, res.accessToken);
      localStorage.removeItem('my-creatures');
    }

    console.log('Retrieved localStorage creatures');

    await userService.readUser(res.db_id, res.accessToken)
      .then(response => {

        dispatch({ type: 'LOG_IN', user: {
          username: response.username,
          email: response.email,
          db_id: res.db_id,
          accessToken: res.accessToken,
          creatures: storedCreatures.length >= 1 ? storedCreatures : response.creatures,
        }});

        console.log('Successfully retrieved user data');
      })
      .catch(err => console.error(err));
  }

  // POST user login
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

  // DELETE user
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
