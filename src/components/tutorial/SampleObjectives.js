import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Objective from '../objective/Objective';
import ObjectiveForm from '../objective/ObjectiveForm';
import SampleCreature from './SampleCreature';

import '../objective/objectiveList.css';
import '../objective/adjCreature.css';
import '../objective/deleteCreature.css';

const ObjectiveList = ({ sampleCreature }) => {
  const { user, link, setDest } = useContext(UserContext);
  
  const sendDeleteObj = objId => {
    return objId;
  }

  let ObjectiveComponents;

  if (!user.accessToken) {
    return (
      <Route exact path="/tutorial/objectives">
        <Redirect to="/" />
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
        />
      )
    });

    if (sampleCreature.objectives.length < 1) ObjectiveComponents = null;
  }

  if (sampleCreature.id === 'creatureTutorial') {
    return (
      <div className="update-container">
        <button className="creatures-return-link-obj" onClick={() => setDest('creatures')}>Return to Creatures</button>

        <div className="adjacent-creature-container">
          <div className="adjacent-creature-display">
            <SampleCreature creature={sampleCreature} />
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
          <ObjectiveForm creatureId={sampleCreature.id}/>
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
