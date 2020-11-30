import React, { useState, useContext } from 'react';
import { CreatureContext } from '../../contexts/CreatureContext';

const ObjectiveCompleteForm = ({ creature, objective }) => {
  const { getExp, play, togglePlay, expUpdate, toggleExpUpdate } = useContext(CreatureContext);

  const [time, setTime] = useState(0);

  const handleChange = (event) => {
    setTime(event.target.value);
  }
  
  const completeObjective = event => {
    event.preventDefault();

    if (!play) togglePlay();
    if (!expUpdate) toggleExpUpdate();

    if (!objective.isTimed) {
      getExp(creature, objective, 1);
      return togglePlay();
    }

    getExp(creature, objective, time);

    togglePlay();

    setTime(0);
  }

  if (objective.isTimed) {
    return (
      <div className="complete-obj-container">
        <form onSubmit={completeObjective} className="complete-obj-form">
          <label className="time-text">Time (hrs)</label>
          <input 
            type="number"
            name="time"
            value={time}
            min={0.25}
            max={24}
            step={0.25}
            onChange={handleChange}
            className="time-input"
            placeholder={0}
          />
          <button className="complete-obj-btn">Complete Habit</button>
        </form>
      </div>
    )
  }

  return (
    <div className="complete-obj-container">
      <form onSubmit={completeObjective} className="complete-obj-form">
        <button className="complete-obj-btn">Complete Habit</button>
      </form>
    </div>
  )
}

export default ObjectiveCompleteForm;
