import React, { useEffect, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { TutorialContext } from '../../contexts/TutorialContext';

import Objective from '../objective/Objective';
import ObjectiveForm from '../objective/ObjectiveForm';
import SampleCreature from './SampleCreature';
import Duck from './Duck';

import '../objective/objectiveList.css';
import '../objective/adjCreature.css';
import '../objective/deleteCreature.css';

const ObjectiveList = () => {
  const { user, link, setDest } = useContext(UserContext);

  const { sampleCreature, setSampleCreature, completeTutorial } = useContext(TutorialContext);
  
  const sendDeleteObj = objId => {
    return setSampleCreature({
      ...sampleCreature,
      objectives: [...sampleCreature.objectives.filter(obj => obj.id !== objId)]
    });
  }

  useEffect(() => {
    console.log('sampleCreature.objectives', sampleCreature.objectives)
  }, [sampleCreature]);

  let ObjectiveComponents;

  const img = require('../../images/pokeballs/13.png');

  if (user.accessToken) {
    return (
      <Route exact path="/tutorial/objectives">
        <Redirect to="/user/update" />
      </Route>
    )
  }

  if (link.dest === 'tutorial') {
    return (
      <Route exact path="/tutorial/objectives">
        <Redirect to="/" />
      </Route>
    )
  }

  if (link.dest === 'tutorialUpdate') {
    return (
      <Route exact path="/tutorial/objectives">
        <Redirect to="/tutorial/update" />
      </Route>
    )
  }

  const completeSample = () => {
    setSampleCreature({
      ...sampleCreature,
      level: 2,
      exp: 1,
      expGoal: 9,
      prevExp: 0,
      expSurplus: 0,
      streak: 1,
    });

    // disable complete button OR auto redirect to tutorial index
  }

  if (sampleCreature.id === 'creatureTutorial') {
    ObjectiveComponents = sampleCreature.objectives.length >= 1
      ? sampleCreature.objectives.sort((a, b) => a.factor - b.factor)
      : [];

    ObjectiveComponents = ObjectiveComponents.map(objective => {
      return (
        <Objective 
          key={objective.id}
          objective={objective}
          creature={sampleCreature}
          sendDeleteObj={sendDeleteObj}
          completeSample={completeSample}
        />
      )
    });

    if (sampleCreature.objectives.length < 1) ObjectiveComponents = null;
  }

  const addSampleObjective = obj => {
    return setSampleCreature({
      ...sampleCreature,
      objectives: [...sampleCreature.objectives, obj]
    });
  }

  const closeObjectives = () => {
    setSampleCreature({
      ...sampleCreature,
      showObjectives: false
    });

    return setDest('tutorial');
  }

  if (sampleCreature.id === 'creatureTutorial') {
    return (
      <div id="sample-objectives__container">
        <div id="duck-objectives__container">
          <Duck />
        </div>

        <div className="update-container">
          <button className="creatures-return-link-obj" onClick={closeObjectives}>Return to Tutorial</button>

          <div id="skip__container">
            <button id="skip-tutorial-btn" onClick={completeTutorial}>Skip Tutorial</button>
          </div>

          <div className="adjacent-creature-container">
            <div className="adjacent-creature-display">
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
          </div>

          <div className="objectives-container">
            <h3 className="obj-list-title">{sampleCreature.name}'s Habits</h3>
            
            <span className="swipe-text">Swipe to scroll</span>
            
            <div className="obj-list-container">
              {
                !ObjectiveComponents
                  ? <h2 className="no-obj-text">Add some Habits for your Creature!</h2>
                  : <ul className="objectives-list">
                      {ObjectiveComponents}
                    </ul>
              }
            </div>
          </div>
          
          <div className="objective-form-container">
            <h3 className="add-obj-title">Add a New Habit</h3>
            <ObjectiveForm creatureId={sampleCreature.id} addSampleObjective={addSampleObjective} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Route exact path="/tutorial/objectives">
      <Redirect to="/" />
    </Route>
  )
}

export default ObjectiveList;
