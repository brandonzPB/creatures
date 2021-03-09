import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import SampleCreature from './SampleCreature';

const Tutorial = () => {
  const { user, link, setDest } = useContext(UserContext);

  const [complete, setComplete] = useState({ state: false });
  
  const [creature, setCreature] = useState({
    name: '',
    purpose: '',
  })

  useEffect(() => {
    const storedCompletion = localStorage.getItem('tutorialComplete');

    if (storedCompletion) {
      return setDest({
        ...link,
        dest: 'welcome'
      });
    }

    if (!complete.state) return;
    else {
      localStorage.setItem('tutorialComplete', JSON.stringify(complete));
      
      return setDest({
        ...link,
        dest: 'welcome'
      });
    }
  }, [complete]);

  if (user.accessToken) {
    return (
      <Route exact path="/tutorial">
        <Redirect to="/user/update" />
      </Route>
    )
  }

  if (link.dest === 'welcome') {
    return (
      <Route exact path="/">
        <Redirect to="/welcome" />
      </Route>
    )
  }

  if (link.dest === 'tutorialObjectives') {
    return (
      <Route exact path="/">
        <Redirect to="/tutorial/objectives" />
      </Route>
    )
  }

  if (link.dest === 'tutorialUpdate') {
    return (
      <Route exact path="/">
        <Redirect to="/tutorial/update" />
      </Route>
    )
  }

  if (link.dest === 'tutorialCreate') {
    return (
      <Route exact path="/">
        <Redirect to="/tutorial/create" />
      </Route>
    )
  }

  const completeTutorial = () => {
    return setComplete({
      ...complete,
      state: true
    });
  }

  return (
    <div id="tutorial__container">
      <div id="create-btn__container">
        {
          user.creatures.length < 1 || user.creatures.length === undefined
            ? <button className="create-link" onClick={() => setDest('tutorialCreate')}>New Creature</button>
            : user.creatures.length === 1 ?
            <div className="team-full">
              <span className="full-text">You can create more creatures after the tutorial!</span>
            </div> :
            <div className="empty"></div>
        }
      </div>
      
      <div id="skip__container">
        <button id="skip-tutorial-btn" onClick={completeTutorial}>Skip Tutorial</button>
      </div>

      <SampleCreature />
    </div>
  )
}

export default Tutorial;
