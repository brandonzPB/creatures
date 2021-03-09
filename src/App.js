import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';

import CreatureContextProvider from './contexts/CreatureContext';
import ConfirmDisplayContextProvider from './contexts/ConfirmDisplayContext';
import UserContextProvider from './contexts/UserContext';
import ThemeContextProvider from './contexts/ThemeContext';

import Tutorial from './components/tutorial/Tutorial';
import SampleCreateForm from './components/tutorial/SampleCreateForm';
import SampleObjectives from './components/tutorial/SampleObjectives';
import SampleUpdate from './components/tutorial/SampleUpdate';

import Welcome from './components/Welcome';
import UserCreateForm from './components/user/UserCreateForm';
import LoginForm from './components/user/LoginForm';

import ForgotPassword from './components/user/ForgotPassword';
import ResetCode from './components/user/ResetCode';
import ResetPassword from './components/user/ResetPassword';

import UserUpdateForm from './components/user/UserUpdateForm';
import LogoutButton from './components/user/LogoutButton';

import CreatureForm from './components/creature/CreatureForm';
import CreatureList from './components/creature/CreatureList';
import CreatureUpdateForm from './components/creature/CreatureUpdateForm';

import ObjectiveList from './components/objective/ObjectiveList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeContextProvider>
          <div className="quote-container">
            <span className="quote">"We are what we repeatedly do. Excellence, then, is a habit, not an act"</span>
            <a href="https://en.wikipedia.org/wiki/Will_Durant" target="_blank" rel="noreferrer" className="quote-credit">—Will Durant</a>
          </div>

          <UserContextProvider>
            <CreatureContextProvider>
              <ConfirmDisplayContextProvider>
                <LogoutButton />

                <Route exact path="/" component={Tutorial} />
                <Route exact path="/tutorial/create" component={SampleCreateForm} />
                <Route exact path="/tutorial/objectives" component={SampleObjectives} />
                <Route exact path="/tutorial/update" component={SampleUpdate} />

                <Route exact path="/welcome" component={Welcome} />
                <Route exact path="/user/create" component={UserCreateForm} />
                <Route exact path="/user/login" component={LoginForm} />

                <Route exact path="/user/update" component={UserUpdateForm} />
                <Route exact path="/user/reset/forgot" component={ForgotPassword} />
                <Route exact path="/user/reset/code" component={ResetCode} />
                <Route exact path="/user/reset/password" component={ResetPassword} />

                <Route exact path="/creatures" component={CreatureList} />
                <Route exact path="/creature/create" component={CreatureForm} />
                <Route exact path="/creature/info" component={ObjectiveList} />
                <Route exact path="/creature/update" component={CreatureUpdateForm} />
              </ConfirmDisplayContextProvider>
            </CreatureContextProvider>
          </UserContextProvider>

          <span className="credit">
            <a href="https://github.com/brandonzPB" target="_blank" className="github-link" rel="noopener noreferrer">
              github.com/brandonzPB
            </a>
          </span>
        </ThemeContextProvider>
      </div>
    </BrowserRouter>
  )
}

export default App;
