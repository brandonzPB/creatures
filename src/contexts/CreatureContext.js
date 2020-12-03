import React, { useState, useReducer, useEffect, useContext, createContext } from 'react';
import creatureReducer from '../reducers/creatureReducer';
import * as objective from '../modules/objective'
import * as streakTime from '../modules/age';
import creatureService from '../services/creatureService';
import { UserContext } from './UserContext';

export const CreatureContext = createContext();

const CreatureContextProvider = (props) => {
  const { user, userDispatch, updateUser } = useContext(UserContext);

  const [creatures, dispatch] = useReducer(creatureReducer, user.creatures);
  //   const creatures = localStorage.getItem('my-user');
  //   const storedCreatures = creatures ? JSON.parse(creatures) : [];
  //   return storedCreatures.creatures;
  // });

  /* useEffect(() => {
    console.log('creatures', creatures)

    dispatch({ type: 'UPDATE_STATE', creatures: { creatures: user.creatures }});
  }, [])

  useEffect(() => {
    userDispatch({ type: 'UPDATE_CREATURES', creatures: { creatures: user.creatures }});
    localStorage.setItem('my-user', JSON.stringify(user));
  }, [user.creatures]); */

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

  const [done, setDone] = useState({
    type: '',
    object: ''
  });

  useEffect(() => {
    if (done.type === 'objective') {
      updateObjectives();

      return setDone({
        ...done,
        type: '',
        object: null
      });
    } else if (done.type === 'creature') {
      createCreature(done.object);

      return setDone({
        ...done,
        type: '',
        object: null
      });
    } else if (done.type === 'db') {
      updateUser();

      return setDone({
        ...done,
        type: '',
        object: null
      });
    }

    return false;
  }, [done]);

  // CREATE CREATURE
  const finish = (type, object = null) => {
    return type = 'creature' ?
      setDone({
        ...done, 
        type,
        object
      }) :
      setDone({
        ...done,
        type
      });
  }

  const createCreature = creatureObject => {
    creatureService.createCreature(user.db_id, creatureObject, user.accessToken)
      .then(res => {
        console.log(res);
        finish('db');
        return res;
      })
      .catch(err => console.error(err));

    console.log('Successfully added creature', creatureObject);
  }

  // UPDATE CREATURE STATS
  const updateCreatureStats = async (creatureId) => {
    const creature = user.creatures.filter(being => being.id === creatureId);

    await creatureService.updateCreatureStats(user.db_id, creatureId, creature[0], user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    userDispatch({ type: 'UPDATE_CREATURE', creature: {
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

  /// OBJECTIVE METHODS ///

  const checkObjectiveText = (creatureId, text) => {
    const thisCreature = user.creatures.filter(being => being.id === creatureId);

    const objectiveIndex = thisCreature[0].objectives.findIndex(item => item.text.toLowerCase() === text.toLowerCase());
    return (objectiveIndex >= 0) ? true : false;
  }

  // UPDATE OBJECTIVES
  const updateObjectives = async () => {
    const creature = user.creatures.filter(creature => creature.id === currentId);

    const objectives = creature[0].objectives;
    console.log('objectives', objectives)

    await creatureService.updateObjectives(user.db_id, creature[0]._id, objectives, user.accessToken)
      .then(res => console.log('res', res))
      .catch(err => console.error(err));

    console.log('Successfully updated objectives');
  }

  // UPDATE CREATURE INFO
  const updateCreatureInfo = async (creatureId) => {
    const creature = user.creatures.filter(being => being.id === creatureId);

    userDispatch({ type: 'UPDATE_CREATURE', creature: {
      creature_name: creature.creature_name,
      evolutions: creature.evolutions,
    }});

    await creatureService.updateCreatureObjectives(user.db_id, creatureId, creature[0], user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    console.log('Successfully added creature');
  }

  // DELETE CREATURE
  const deleteCreature = async (creatureId) => {
    const creature = user.creatures.filter(being => being.id === creatureId);

    userDispatch({ type: 'DELETE_CREATURE', id: creatureId });

    await creatureService.deleteCreature(user.db_id, creature[0]._id, user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

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

    userDispatch({ type: 'ADD_EXP', creature: {
      id: creature.id,
      newTotal,
      newSurplus
    }});

    return creature;
  }

  const getFirstExp = creature => {
    const newTotal = 1;
    const newSurplus = 0;

    userDispatch({ type: 'ADD_EXP', creature: { id: creature.id, newTotal, newSurplus } });

    return creature;
  }

  const toggleExpUpdate = () => {
    setExpUpdate(!expUpdate);
  }

  const toggleFormDisplay = () => {
    setFormDisplay(!formDisplay);
  }

  const showCreatureObjectives = async (id) => {
    return setCurrentId(id);
  }

  const togglePlay = () => {
    setPlay(!play);
  }

  return (
    <CreatureContext.Provider 
      value={{
        creatures,
        createCreature,
        updateCreatureInfo,
        updateCreatureStats,
        updateObjectives,
        deleteCreature, 
        currentId,
        play,
        togglePlay,
        formDisplay,
        toggleFormDisplay,
        expUpdate,
        toggleExpUpdate,
        done,
        setDone,
        finish,
        dispatch,
        showCreatureObjectives,
        getExp,
        checkObjectiveText,
      }}>
      {props.children}
    </CreatureContext.Provider>
  )
}

export default CreatureContextProvider;
