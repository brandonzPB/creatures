import React, { useContext } from 'react';
import { CreatureContext } from '../../contexts/CreatureContext';
import ObjectiveCompleteForm from './ObjectiveCompleteForm';

const Objective = ({ objective, creature }) => {
  const { dispatch } = useContext(CreatureContext);
  
  const deleteObjective = () => {
    dispatch({
      type: 'DELETE_OBJECTIVE', 
      creatureId: creature.id,
      item: objective.id
    });
  }

  const difficultyColor = objective.factor === 1 ? 'rgba(142, 104, 199, 0.3)'
    : objective.factor === 2 ? 'rgba(119, 79, 179, 0.4)'
    : objective.factor === 3 ? 'rgba(101, 62, 158, 0.6)'
    : ' rgba(90, 52, 146, 0.8)';

  return (
    <div className="objective">
      <div className="delete-btn-container">
        <button className="objective-delete-btn" onClick={deleteObjective}>&#10060;</button>
      </div>

      <div className="objective-data" style={{
        backgroundColor: difficultyColor,
        borderRadius: '10px',
        width: '300px'
       }}>
        <span className="objective-text">{objective.text}</span>
        <span className="objective-difficulty">{objective.difficulty}</span>
      </div>

      <div className="objective-complete-form-container">
        <ObjectiveCompleteForm 
        objective={objective}
        creature={creature}
        />
      </div>
    </div>
  )
}

export default Objective;
