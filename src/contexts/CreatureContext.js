import React, { useState, useReducer, useEffect, createContext } from 'react';
import creatureReducer from '../reducers/creatureReducer';
import * as objective from '../modules/objective'
import * as streakTime from '../modules/age';

export const CreatureContext = createContext();

const CreatureContextProvider = (props) => {
  const [creatures, dispatch] = useReducer(creatureReducer, [], () => {
    const storedCreatures = localStorage.getItem('my-creatures');
    return storedCreatures ? JSON.parse(storedCreatures) : [];
  });

  const [currentId, setCurrentId] = useState('');
  const [play, setPlay] = useState(false);
  const [formDisplay, setFormDisplay] = useState(true);
  const [expUpdate, setExpUpdate] = useState(false);

  // Remove this hook once user is able to log in
  // And creatures are stored to database under account
  useEffect(() => {
    localStorage.setItem('my-creatures', JSON.stringify(creatures));
  }, [creatures]);

  const getExp = (creature, habit, time) => { 
    if (creature.isNoob) return getFirstExp(creature);

    const streakCount = creature.streak ? creature.streak.count : 0;

    const newExp = objective.calcExp(creature.multiplier, streakCount, habit.difficulty, time);
    const newTotal = creature.exp + newExp;

    const newSurplus = (newTotal >= creature.expGoal) ? 
      newTotal - creature.expGoal :
      creature.expSurplus + newExp;

    dispatch({ type: 'ADD_EXP', creature: {
      id: creature.id,
      newTotal,
      newSurplus
    }});

    return creature;
  }

  const getFirstExp = creature => {
    const newTotal = 1;
    const newSurplus = 0;

    dispatch({ type: 'ADD_EXP', creature: { id: creature.id, newTotal, newSurplus } });

    return creature;
  }

  const toggleExpUpdate = () => {
    setExpUpdate(!expUpdate);
  }

  const toggleFormDisplay = () => {
    setFormDisplay(!formDisplay);
  }

  const sendCreatureId = id => {
    return setCurrentId(id);
  }

  const togglePlay = () => {
    setPlay(!play);
  }

  const checkObjectiveText = (creatureId, text) => {
    const creatureInfo = creatures.filter(being => being.id === creatureId);

    const objectiveIndex = creatureInfo[0].objectives.findIndex(item => item.text.toLowerCase() === text.toLowerCase());
    return (objectiveIndex >= 0) ? true : false;
  }

  return (
    <CreatureContext.Provider 
      value={{
        creatures, 
        currentId,
        play,
        togglePlay,
        formDisplay,
        toggleFormDisplay,
        expUpdate,
        toggleExpUpdate,
        dispatch,
        sendCreatureId,
        getExp,
        checkObjectiveText,
      }}>
      {props.children}
    </CreatureContext.Provider>
  )
}

export default CreatureContextProvider;
