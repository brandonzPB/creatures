import React, { useState, useReducer, useEffect, useContext, createContext } from 'react';
import creatureReducer from '../reducers/creatureReducer';
import * as objective from '../modules/objective'
import creatureService from '../services/creatureService';
import { UserContext } from './UserContext';

export const CreatureContext = createContext();

const CreatureContextProvider = (props) => {
  const { user, userDispatch, updateUser, refreshUser, logout } = useContext(UserContext);

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
    object: '',
    method: '',
  });

  useEffect(() => {
    if (done.type.trim()) {

      if (done.type === 'objective') {
        updateObjectives();

      } else if (done.type === 'creature') {
        if (done.method === 'create') createCreature(done.object);
        else if (done.method === 'stats') updateCreatureStats(done.object.id);
        else if (done.method === 'info') updateCreatureInfo(done.object.id);

      } else if (done.type === 'db') {
        if (done.method === 'refresh') refreshUser();
        else if (done.method === 'update' || done.method === 'updatePassword' || done.method === 'creatures') updateUser(done.method);
        else if (done.method === 'delete') logout();
      }

      return setDone({ ...done,
        type: '',
        object: null,
        method: '',
      });
    }

    return false;
  }, [done]);

  const finish = (type, object = null, method = null) => {
    return type = 'creature' ?
      setDone({
        ...done, 
        type,
        object,
        method
      }) :
      setDone({
        ...done,
        type,
        object,
        method
      });
  }


  // CREATE CREATURE
  const createCreature = creatureObject => {
    creatureService.createCreature(user.db_id, creatureObject, user.accessToken)
      .then(res => {
        console.log('res', res);
        finish('db', null, 'refresh');
        return res;
      })
      .catch(err => console.error(err));

    console.log('Successfully added creature', creatureObject);
  }

  // UPDATE CREATURE STATS
  const updateCreatureStats = async (creatureId) => {
    console.log('Updating creature...');

    const creature = user.creatures.filter(being => being.id === creatureId);

    await creatureService.updateCreatureStats(user.db_id, creature[0]._id, creature[0], user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    console.log('Successfully updated creature');
  }

  // UPDATE CREATURE INFO
  const updateCreatureInfo = async (creatureId) => {
    console.log('Updating creature...');

    const creature = user.creatures.filter(being => being.id === creatureId);

    await creatureService.updateCreatureInfo(user.db_id, creature[0]._id, creature[0], user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    console.log('Successfully updated creature');
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

  // DELETE CREATURE
  const postDelete = () => {
    console.log('Deleting creature', currentId);

    const creature = user.creatures.filter(being => being.id === currentId);
    const creatureDbId = creature[0]._id.toString();

    userDispatch({ type: 'DELETE_CREATURE', id: currentId });

    deleteCreature(creatureDbId);

    finish('db', null, 'refresh');
  }

  const deleteCreature = (creatureId) => {
    creatureService.deleteCreature(user.db_id, creatureId, user.accessToken)
      .then(res => res)
      .catch(err => console.error(err));

    console.log('Successfully deleted creature.');
  }

  const getExp = (habit, time) => { 
    const creature = user.creatures.filter(creature => creature.id === currentId);

    if (creature[0].is_noob) return getFirstExp(creature[0]);

    const streakCount = creature[0].streak_count;

    const newExp = objective.calcExp(creature[0].multiplier, streakCount, habit.difficulty, time);
    const newTotal = creature[0].exp + newExp;

    const newSurplus = (newTotal >= creature[0].exp_goal) ? 
      newTotal - creature[0].exp_goal :
      creature[0].exp_surplus + newExp;

    userDispatch({ type: 'ADD_EXP', creature: {
      id: currentId,
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
        postDelete,
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
