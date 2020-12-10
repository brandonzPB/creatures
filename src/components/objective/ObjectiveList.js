import React, { useContext } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { CreatureContext } from '../../contexts/CreatureContext';
import { ConfirmDisplayContext } from '../../contexts/ConfirmDisplayContext';
import { UserContext } from '../../contexts/UserContext';
import Objective from './Objective';
import ObjectiveForm from './ObjectiveForm';
import ConfirmDisplay from '../ConfirmDisplay';
import Creature from '../creature/Creature';
import * as ageMethods from '../../modules/age';

const ActionList = () => {
  const { currentId, showCreatureObjectives, postDelete, finish } = useContext(CreatureContext);
  const { confirmDisplay, toggleConfirmDisplay } = useContext(ConfirmDisplayContext);
  const { user, userDispatch } = useContext(UserContext);

  let creatureInfo;
  let ObjectiveComponents;
  let CreatureComponent;
  let birthdate;
  let age;
  let creatureName;

  const sendDeleteObj = (objectiveId) => {
    userDispatch({ type: 'DELETE_OBJECTIVE', 
      creatureId: currentId,
      objectiveId
    });
   
    finish('objective');
  }

  if (!user.accessToken) {
    return (
      <Route exact path="/creature/info">
        <Redirect to="/" />
      </Route>
    )
  }

  if (currentId) {
    creatureInfo = user.creatures.find(being => being.id === currentId);

    ObjectiveComponents = creatureInfo.objectives.length >= 1
      ? creatureInfo.objectives.sort((a, b) => a.factor - b.factor)
      : [];

    ObjectiveComponents = ObjectiveComponents.map(objective => {
      return (
        <Objective 
          key={objective.id}
          objective={objective}
          creature={creatureInfo}
          sendDeleteObj={sendDeleteObj}
        />
      )
    });

    if (creatureInfo.objectives.length < 1) ObjectiveComponents = null;

    CreatureComponent = user.creatures.map(creature => {
      if (creature.id === currentId) {
        return (
          <Creature 
            key={creature.id}
            creature={creature}
          />
        )
      }
      return null;
    });

    birthdate = creatureInfo.birth_date.length ? ageMethods.convertBirthdate(creatureInfo.birth_date) : creatureInfo.birth_date;
    age = creatureInfo.age;
    creatureName = creatureInfo.creature_name;
  }

  const sendDelete = () => {
    console.log('Deleting creature...', currentId);

    const creatureId = currentId;

    postDelete(creatureId);

    showCreatureObjectives('');
  }

  if (currentId) {
    return (
      <div className="update-container">
        <Link to="/creatures">
          <p className="creatures-return-link-obj">Return to Creatures</p>
        </Link>

        <div className="adjacent-creature-container">
          <div className="adjacent-creature-container-fluid">
            <div className="adjacent-creature-display">
              {CreatureComponent}
            </div>

            <div className="adjacent-creature-age">
              Date of creation: {birthdate}
              <br />
              Age: {age}
            </div>

            <div className="kill-btn-container">
              <button className="kill-btn" onClick={toggleConfirmDisplay} style={{
                background: confirmDisplay.confirmIsDisplayed ? 'rgb(108,117,125)' : 'rgb(220,53,69)'
              }}>
                {
                  confirmDisplay.confirmIsDisplayed ? 'Cancel' : 'Delete Creature'
                }
              </button>

              <div className="confirm-delete-modal" style={{
                display: confirmDisplay.confirmIsDisplayed ? 'flex' : 'none'
              }}>
                <ConfirmDisplay 
                  sendDelete={sendDelete}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="objectives-container">
          <h3 className="obj-list-title">{creatureName}'s Habits</h3>
          <span className="swipe-text">Swipe left/right to see full habit</span>
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
          <ObjectiveForm creatureId={creatureInfo.id}/>
        </div>
      </div>
    )
  }

  return (
    <Route exact path="/creature/info">
      <Redirect to="/creatures" />
    </Route>
  )
}

export default ActionList;
