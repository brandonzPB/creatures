import React, { useState, useReducer, useEffect, useContext, createContext } from 'react';
import creatureReducer from '../reducers/creatureReducer';
import * as objective from '../modules/objective'
import * as streakTime from '../modules/age';
import creatureService from '../services/creatureService';
import UserContextProvider, { UserContext } from './UserContext';

export const CreatureContext = createContext();

const CreatureContextProvider = (props) => {
  const { user } = useContext(UserContext);

  const [creatures, dispatch] = useReducer(creatureReducer, user.creatures || [], () => {
    const storedCreatures = localStorage.getItem('my-user');
    return storedCreatures.creatures ? JSON.parse(storedCreatures).creatures : [];
  });

  // set localstorage creatures and test if they are added to new account

  const [currentId, setCurrentId] = useState('');
  const [play, setPlay] = useState(false);
  const [formDisplay, setFormDisplay] = useState(true);
  const [expUpdate, setExpUpdate] = useState(false);

  useEffect(() => {
    localStorage.setItem('my-user', JSON.stringify(user));
    const storage = JSON.parse(localStorage.getItem('my-user'));
    console.log(storage);
  }, [creatures]);

  // DELETE creature
  const deleteCreature = async (creatureId) => {
    const creature = user.creatures.filter(being => being.id === creatureId);

    await creatureService.deleteCreature(user.db_id, creature._id, creature, user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));
    
    dispatch({ type: 'DELETE_CREATURE', creature: { creature }});

    console.log('Successfully deleted creature: ' + creature);
  }

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
        deleteCreature, 
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
