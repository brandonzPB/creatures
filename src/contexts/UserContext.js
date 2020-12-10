import React, { useState, useReducer, createContext, useEffect } from 'react';
import userService from '../services/userService';
import userReducer from '../reducers/userReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, {}, () => {
    const storedUser = localStorage.getItem('my-user');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [createResult, setCreateResult] = useState({ success: false });

  const [reset, setReset] = useState({
    resetToken: '',
    email: '',
    code: '',
    passwordReset: false
  });

  useEffect(() => {
    localStorage.setItem('my-user', JSON.stringify(user));

    console.log('user', user);
    console.log(user.accessToken);
  }, [user]);

  useEffect(() => {
    localStorage.setItem('my-reset', JSON.stringify(reset));

    console.log('reset', reset);
  }, [reset]);
  
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

    userDispatch({ type: 'POST_LOCAL_CREATURES', creatures: { creatures }});
  }

  const refreshUser = () => {
    console.log('Refreshing!');

    userService.readUser(user.db_id, user.accessToken)
      .then(res => {
        console.log(res);

        userDispatch({ type: 'REFRESH_USER', user: {
          username: res.user.username,
          email: res.user.email,
          password: res.user.password,
          db_id: user.db_id,
          accessToken: user.accessToken,
          creatures: res.user_creatures,
        }});

        return res;
      })
      .catch(err => console.error(err));
  }

  const updateUser = (method) => {
    console.log('Updating user...');

    userService.updateUser(method, user.db_id, user, user.accessToken)
      .then(res => {
        console.log('res', res);
        return res;
      })
      .catch(err => console.error(err));
  }

  // GET user info
  const getUserInfo = async (res, password) => {
    console.log('Successfully logged in', res.db_id, res.accessToken);

    const storedCreatures = await getLocalCreatures();

    console.log(storedCreatures);

    if (storedCreatures.length >= 1) {
      postLocalCreatures(res.db_id, storedCreatures, res.accessToken);
      console.log('Retrieved localStorage creatures');

      localStorage.removeItem('my-creatures');
      console.log('Cleared \'my-creatures\' from localStorage');
    }

    await userService.readUser(res.db_id, res.accessToken)
      .then(response => {
        console.log(response);

        const newDay = (new Date()).getDay();
        const newTime = Date.now();

        userDispatch({ type: 'LOG_IN', user: {
          username: response.user.username,
          email: response.user.email,
          password,
          db_password: response.user.password,
          db_id: res.db_id,
          accessToken: res.accessToken,
          creatures: storedCreatures.length >= 1 ? storedCreatures : response.user_creatures,
          newDay,
          newTime,
        }});

        console.log('Successfully retrieved user data');
      })
      .catch(err => console.error(err));
  }

  // DELETE user
  const removeUser = () => {
    console.log('Deleting user...');
    
    localStorage.removeItem('my-user');
    localStorage.removeItem('my-reset');

    userService.deleteUser(user.db_id, user, user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    console.log('Successfully deleted user');
  }

  // LOG OUT
  const logout = () => {
    userDispatch({ type: 'LOG_OUT' });
    localStorage.removeItem('my-reset');
    localStorage.removeItem('my-user');
  }

  return (
    <UserContext.Provider value={{
      user,
      userDispatch,
      getUserInfo,
      refreshUser,
      updateUser,
      createResult,
      setCreateResult,
      reset,
      setReset,
      postLocalCreatures,
      removeUser,
      logout,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
