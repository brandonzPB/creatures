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

    dispatch({ type: 'POST_LOCAL_CREATURES', creatures: { creatures }});
  }

  // GET user info
  const getUserInfo = async (res) => {
    console.log('Successfully logged in', res.db_id, res.accessToken);

    const storedCreatures = await getLocalCreatures();

    console.log(storedCreatures);

    if (storedCreatures.length >= 1) {
      postLocalCreatures(res.db_ib, storedCreatures, res.accessToken);
      console.log('Retrieved localStorage creatures');

      localStorage.removeItem('my-creatures');
      console.log('Cleared \'my-creatures\' from localStorage');
    }

    await userService.readUser(res.db_id, res.accessToken)
      .then(response => {

        dispatch({ type: 'LOG_IN', user: {
          username: response.user.username,
          email: response.user.email,
          db_id: res.db_id,
          accessToken: res.accessToken,
          creatures: storedCreatures.length >= 1 ? storedCreatures : response.user_creatures
        }});

        console.log('Successfully retrieved user data');
      })
      .catch(err => console.error(err));
  }

  // POST user login
  const login = async (userObject) => {
    const { username, password } = userObject;

    localStorage.removeItem('my-user');

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

  // LOG OUT
  const logout = () => {
    localStorage.removeItem('my-user');
    dispatch({ type: 'LOG_OUT' });
  }

  return (
    <UserContext.Provider value={{
      user,
      error,
      setError,
      addUser,
      login,
      postLocalCreatures,
      deleteUser,
      logout,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
