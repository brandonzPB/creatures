import React, { useState, useContext } from 'react';
import { CreatureContext } from '../../contexts/CreatureContext';
import { v4 as uuidv4 } from 'uuid';
import * as obj from '../../modules/objective';

const ObjectiveForm = ({ creatureId }) => {
  const { dispatch, checkObjectiveText } = useContext(CreatureContext);
  
  const [objective, setObjective] = useState({
    id: uuidv4(),
    text: '',
    isTimed: false,
    difficulty: 'Medium-Easy',
    factor: '',
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    type === 'checkbox' ?
      setObjective({
        ...objective,
        isTimed: checked
      }) :
      setObjective({
        ...objective,
        [name]: value
      });
  }

  const addObjective = (event) => {
    event.preventDefault();

    if (!objective.text.trim()) return;
    const objectiveExists = checkObjectiveText(creatureId, objective.text);
    if (objectiveExists) return;
    // error message

    const factor = obj.getDifficultyFactor(objective.difficulty);

    dispatch({
      type: 'ADD_OBJECTIVE', 
      creatureId,
      objective: {
        id: objective.id,
        text: objective.text,
        isTimed: objective.isTimed,
        difficulty: objective.difficulty,
        factor
      }
    });
    
    setObjective({
      id: uuidv4(),
      text: '',
      isTimed: false,
      difficulty: 'Medium-Easy',
    })
  }

  return (
    <div className="objective-form">
      <form onSubmit={addObjective}>
        <input 
          type="text"
          name="text"
          value={objective.text}
          onChange={handleChange}
          minLength={0}
          maxLength={40}
          placeholder="Morning Cardio"
          className="obj-text-input"
        />
        <br />
        <input 
          type="checkbox"
          name="isTimed"
          checked={objective.isTimed}
          onChange={handleChange}
          className="obj-time-input"
        /> 
        <span className="obj-time-input-text">Time-Based</span>
        <br />
        <span className="obj-difficulty-select-text">Select Difficulty</span>
        <select value={objective.difficulty} onChange={handleChange} name="difficulty" className="obj-difficulty-select">
          <option disabled>Select a Difficulty</option>
          <option value="Medium-Easy">Medium-Easy</option>
          <option value="Medium">Medium</option>
          <option value="Medium-Hard">Medium-Hard</option>
          <option value="Hard">Hard</option>
        </select>
        <br />
        <button className="add-obj-btn">Add Habit</button>
      </form>
    </div>
  )
}

export default ObjectiveForm;
