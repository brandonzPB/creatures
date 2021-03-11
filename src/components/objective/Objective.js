import React from 'react';
import ObjectiveCompleteForm from './ObjectiveCompleteForm';

import './objective.css';

const Objective = ({ objective, creature, sendDeleteObj, completeSample }) => {
  const difficultyColor = objective.factor === 1 ? 'rgba(142, 104, 199, 0.3)'
    : objective.factor === 2 ? 'rgba(119, 79, 179, 0.4)'
    : objective.factor === 3 ? 'rgba(101, 62, 158, 0.6)'
    : ' rgba(90, 52, 146, 0.8)';

  return (
    <div className="objective">
      <div className="delete-btn-container">
        <button className="objective-delete-btn" onClick={() => sendDeleteObj(objective.id)}>
          <span role="img">&#10060;</span>
        </button>
      </div>

      <div className="objective-data" style={{
        backgroundColor: difficultyColor,
        borderRadius: '10px',
        width: '300px'
      }}>
        <span className="objective-text">{objective.text}</span>
        <span className="objective-difficulty">
          {
            objective.difficulty === 'Medium-Easy' ? 'Relaxed'
              : objective.difficulty === 'Medium' ? 'Medium'
              : objective.difficulty === 'Medium-Hard' ? 'Focused'
              : objective.difficulty === 'Hard' ? 'Like a Roman' : ''
          }
        </span>
      </div>

      <div className="objective-complete-form-container">
        <ObjectiveCompleteForm 
        objective={objective}
        creature={creature}
        completeSample={completeSample}
        />
      </div>
    </div>
  )
}

export default Objective;
