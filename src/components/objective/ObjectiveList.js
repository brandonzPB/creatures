import React, { useContext } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { CreatureContext } from '../../contexts/CreatureContext';
import { ConfirmDisplayContext } from '../../contexts/ConfirmDisplayContext';
import Objective from './Objective';
import ObjectiveForm from './ObjectiveForm';
import ConfirmDisplay from '../creature/ConfirmDisplay';
import Creature from '../creature/Creature';

const ActionList = () => {
  const { dispatch, creatures, currentId, sendCreatureId, deleteCreature } = useContext(CreatureContext);
  const { confirmDisplay, toggleConfirmDisplay } = useContext(ConfirmDisplayContext);

  let creatureInfo;
  let ObjectiveComponents;
  let CreatureComponent;
  let birthdate;
  let age;
  let creatureName;

  if (currentId) {
    creatureInfo = creatures.find(being => being.id === currentId);

    ObjectiveComponents = creatureInfo.objectives.sort((a, b) => a.factor - b.factor);

    ObjectiveComponents = ObjectiveComponents.map(objective => {
      return (
        <Objective 
          key={objective.id}
          objective={objective}
          creature={creatureInfo}
        />
      )
    });

    if (creatureInfo.objectives.length < 1) ObjectiveComponents = null;

    CreatureComponent = creatures.map(creature => {
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

    birthdate = creatureInfo.birthdate;
    age = creatureInfo.age;
    creatureName = creatureInfo.creatureName;
  }

  const postDelete = () => {
    sendCreatureId('');
    
    deleteCreature(currentId);
  }

  if (currentId) {
    return (
      <div className="update-container">
        <div className="return-btn-container">
          <Link to="/creatures"><button className="return-btn update-return-btn">Return Home</button></Link>
        </div>

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
                  postDelete={postDelete}
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
    <Route exact path="/update">
      <Redirect to="/creatures" />
    </Route>
  )
}

export default ActionList;
