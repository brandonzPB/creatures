import React, { useState, useReducer, createContext, useEffect } from 'react';
import userService from '../services/userService';
import userReducer from '../reducers/userReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, {}, () => {
    const storedUser = localStorage.getItem('my-user');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [thisUser, setThisUser] = useState({
    isLoggedIn: false,
    username: '',
    password: ''
  });

  const [signup, setSignup] = useState(true);

  useEffect(() => {
    localStorage.setItem('my-user', JSON.stringify(user));
  }, [user]);

  const toggleSignup = () => {
    return setSignup(!signup);
  }

  const addUser = async (userObject) => {
    userService
      .createUser(userObject)
      .then(res => { return console.log('Successfully added new user') })
      .catch(err => console.err(err));
  }

  const login = async (userObject) => {
    const { username, email, password } = userObject;

    userService.login({
      username: username || email,
      password
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });

    /* try {
      const user = await userService.login({
        username: username || email,
        password
      });

      setThisUser({
        ...thisUser,
        isLoggedIn: true,
        username: username || email,
        password: password
      });

      console.log(user);

    } catch (exception) {
      throw new Error('Wrong credentials');
    } */

    /* const users = await userService.getAll();

    const thisUser = users.filter(acct => acct.username === user.username);
    
    if (!thisUser) return false; */

    /* getLocalCreatures(); */

    /* userService
      .login(thisUser)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        return console.error(err);
      }); */

    /* dispatch({ type: 'LOG_IN', user: {
      username, email, password,
      creatures: thisUser.creatures,
    }}); */
  }

  const getLocalCreatures = () => {
    const creatureStorage = localStorage.getItem('my-creatures');
    
    const storedCreatures = creatureStorage ? JSON.parse(creatureStorage) : [];

    console.log(storedCreatures);

    dispatch({ type: 'GET_LOCAL_CREATURES', user: {
      creatures: storedCreatures
    }});

    return false;
  }

  const deleteUser = userObject => {}

  return (
    <UserContext.Provider value={{
      user,
      thisUser,
      signup,
      toggleSignup,
      addUser,
      login,
      deleteUser,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
