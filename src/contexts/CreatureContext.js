import React, { useState, useReducer, useEffect, useContext, createContext } from 'react';
import creatureReducer from '../reducers/creatureReducer';
import * as objective from '../modules/objective'
import * as streakTime from '../modules/age';
import creatureService from '../services/creatureService';
import UserContextProvider, { UserContext } from './UserContext';

export const CreatureContext = createContext();

const CreatureContextProvider = (props) => {
  const { user, userDispatch } = useContext(UserContext);

  const [creatures, dispatch] = useReducer(creatureReducer, [], () => {
    const creatures = localStorage.getItem('my-user');
    const storedCreatures = creatures ? JSON.parse(creatures) : [];
    return storedCreatures.creatures;
  });

  useEffect(() => {
    userDispatch({ type: 'UPDATE_CREATURES', creatures: { creatures: creatures }});
    localStorage.setItem('my-user', JSON.stringify(user));
  }, [creatures]);

  /* const [creatures, dispatch] = useReducer(creatureReducer, [], () => {
    const storedCreatures = localStorage.getItem('my-creatures');
    return storedCreatures ? JSON.parse(storedCreatures) : [];
  });

  useEffect(() => {
    localStorage.setItem('my-creatures', JSON.stringify(creatures));
  }, [creatures]); */

  const [currentId, setCurrentId] = useState('');
  const [play, setPlay] = useState(false);
  const [formDisplay, setFormDisplay] = useState(true);
  const [expUpdate, setExpUpdate] = useState(false);

  // CREATE creature
  const createCreature = creatureObject => {
    console.log('creatures', creatures);

    console.log('creature', creatureObject);

    creatureService.createCreature(user.db_id, creatureObject, user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    console.log('Successfully added creature');
  }

  // UPDATE creature stats
  const updateCreatureStats = async (creatureId) => {
    const creature = creatures.filter(being => being.id === creatureId);

    await creatureService.updateCreatureStats(user.db_id, creatureId, creature, user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    dispatch({ type: 'UPDATE_CREATURE', creature: {
      exp: creature.exp,
      exp_goal: creature.exp_goal,
      exp_surplus: creature.exp_surplus,
      prev_exp_goal: creature.prev_exp_goal,
      difficulty: creature.difficulty,
      multiplier: creature.multiplier,
      pokeball_number: creature.pokeball_number,
    }});

    console.log('Successfully added creature');
  }

  // UPDATE creature objectives
  const updateCreatureObjectves = async (creatureId) => {
    const creature = creatures.filter(being => being.id === creatureId);

    await creatureService.updateCreatureObjectves(user.db_id, creatureId, creature, user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    dispatch({ type: 'UPDATE_CREATURE', creature: {
      objectives: creature.objectives,
    }});

    console.log('Successfully added creature');
  }

  // UPDATE creature info
  const updateCreatureInfo = async (creatureId) => {
    const creature = creatures.filter(being => being.id === creatureId);

    await creatureService.updateCreatureObjectves(user.db_id, creatureId, creature, user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    dispatch({ type: 'UPDATE_CREATURE', creature: {
      creature_name: creature.creature_name,
      evolutions: creature.evolutions,
    }});

    console.log('Successfully added creature');
  }

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
    if (creature.is_noob) return getFirstExp(creature);

    const streakCount = creature.streak_count;

    const newExp = objective.calcExp(creature.multiplier, streakCount, habit.difficulty, time);
    const newTotal = creature.exp + newExp;

    const newSurplus = (newTotal >= creature.exp_goal) ? 
      newTotal - creature.exp_goal :
      creature.exp_surplus + newExp;

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
        createCreature,
        updateCreatureStats,
        updateCreatureObjectves,
        updateCreatureInfo,
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
