import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { TutorialContext } from '../../contexts/TutorialContext';

import SampleCreature from './SampleCreature';
import Duck from './Duck';

import './tutorial.css';

const Tutorial = () => {
  const { user, link, setDest } = useContext(UserContext);

  const { sampleCreature, setSampleCreature, completeTutorial, tutorial, setTutorial, advanceScript } = useContext(TutorialContext);

  const [complete, setComplete] = useState({ state: false });

  const img = require('../../images/pokeballs/13.png');

  useEffect(() => {
    const storedCompletion = localStorage.getItem('tutorialComplete');

    if (storedCompletion) {
      return setDest('welcome');
    }

    if (!complete.state) return;
    else {
      localStorage.setItem('tutorialComplete', JSON.stringify(complete));
      
      return setDest('welcome');
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

  if (link.dest === 'tutorialCreate') {
    return (
      <Route exact path="/">
        <Redirect to="/tutorial/create" />
      </Route>
    )
  }

  return (
    <div id="tutorial__container">
      <div id="create-btn__container">
        {
          !sampleCreature.creature.trim()
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

      <div id="duck__container">
        <Duck />
      </div>

      <div className="creature" id="sample-creature__container" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.35)), url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: sampleCreature.creature.trim() ? 'block' : 'none'
      }}>
        <SampleCreature />
      </div>
    </div>
  )
}

export default Tutorial;
