import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CreatureContextProvider from './contexts/CreatureContext';
import ConfirmDisplayContextProvider from './contexts/ConfirmDisplayContext';
import UserContextProvider from './contexts/UserContext';

import CreatureForm from './components/creature/CreatureForm';
import CreatureList from './components/creature/CreatureList';
import CreatureUpdateForm from './components/creature/CreatureUpdateForm';

import ObjectiveList from './components/objective/ObjectiveList';

import User from './components/user/User';
import UserCreateForm from './components/user/UserCreateForm';
import UserDeleteForm from './components/user/UserDeleteForm';
import UserUpdateForm from './components/user/UserUpdateForm';

import Welcome from './components/Welcome';
import LoginForm from './components/user/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="quote-container">
          <span className="quote">"We are what we repeatedly do. Excellence, then, is a habit, not an act"</span>
          <span className="quote-credit">—Will Durant</span>
        </div>

        <UserContextProvider>
          <CreatureContextProvider>
            <ConfirmDisplayContextProvider>
              <Route exact path="/" component={Welcome} />

              <Route exact path="/user" component={User} />
              <Route exact path="/user/create" component={UserCreateForm} />
              <Route exact path="/user/login" component={LoginForm} />
              <Route exact path="/user/update" component={UserUpdateForm} />

              <Route exact path="/creatures" component={CreatureList} />
              <Route exact path="/creature/create" component={CreatureForm} />
              <Route exact path="/creature/info" component={ObjectiveList} />
              <Route exact path="/create/update" component={CreatureUpdateForm} />
            </ConfirmDisplayContextProvider>
          </CreatureContextProvider>
        </UserContextProvider>

        <span className="credit">
          <a href="https://github.com/brandonzPB" target="_blank" className="github-link" rel="noopener noreferrer">
            github.com/brandonzPB
          </a>
        </span>

      </div>
    </BrowserRouter>
  )
}

export default App;
