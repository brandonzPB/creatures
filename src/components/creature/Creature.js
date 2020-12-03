import React, { useState, useEffect, useContext } from 'react';
import { CreatureContext } from '../../contexts/CreatureContext';
import { UserContext } from '../../contexts/UserContext';
import * as stats from '../../modules/stats';
import CreatureDisplay from './CreatureDisplay';
import './creature.css';
import * as age from '../../modules/age';

const lvlUpMusicSrc = require('../../sounds/level-up.mp3');
const levelUpSound = new Audio(lvlUpMusicSrc);

const evolveMusicSrc = require('../../sounds/evolve.mp3');
const evolveSound = new Audio(evolveMusicSrc);

const Creature = ({ creature }) => {
  const { displayObjectives, showCreatureObjectives, expUpdate, toggleExpUpdate } = useContext(CreatureContext);
  const { user, userDispatch } = useContext(UserContext);

  const [levelUpdate, setLevelUpdate] = useState(false);
  const [evolve, setEvolve] = useState(false);

  const pokeball = (!creature.pokeballNumber) ? 13
    : (creature.pokeballNumber < 14) ? 13 // pokeball
    : (creature.pokeballNumber === 14) ? 1 // greatball
    : (creature.pokeballNumber === 15) ? 0 : 11; // ultraball : masterball

  const img = require(`../../images/pokeballs/${pokeball}.png`);

  const toggleLevelUpdate = () => {
    setLevelUpdate(!levelUpdate);
  }

  const toggleEvolve = () => {
    setEvolve(!evolve);
  }

  /// STREAK METHODS ///

  const checkCreatureStreak = () => {
    // checks if streak is broken ('broken', 'constant', or 'increment')

    const streakTimestamp = creature.streak_timestamp;
    const streakDay = creature.streak_day;
    const thisDay = (new Date()).getDay();

    if (streakDay === 6) { // Streak continues if current week day is 0 and less than 24 hours passed

      if (thisDay !== 0 && thisDay !== 6) { // Streak broken
        return 'broken';
      } else if (thisDay === 0) { // Next week day
        // if more than 2 days passed; streak is over
        // else, increment streak count

        const minDifference = age.getAge(streakTimestamp, false);
        return minDifference > 2880 ? 'broken' : 'increment';
      } else { // Same day

        return 'constant';
      }

    } else { // Streak continues if current week day is streak.timestamp + 1, and if less than 24 hours passed
      
      if (thisDay === streakDay + 1) {
        // if more than 2 days passed; streak is over
        // else, increment streak count

        const minDifference = age.getAge(streakTimestamp, false);
        return minDifference > 2880 ? 'broken' : 'increment';
      } else if (streakDay === thisDay) { // Same day

        return 'constant';
      } else {
        return 'broken';
      }
    }
  }

  const updateCreatureStreak = () => {
    const newCount = creature.streak_count + 1;
    const newTimestamp = Date.now();
    const newDay = (new Date()).getDay();

    userDispatch({ type: 'UPDATE_STREAK', creature: {
      id: creature.id,
      newCount,
      newTimestamp,
      newDay,
    }});

    return creature;
  }

  const resetCreatureStreak = () => {
    const newCount = 0;
    const newTimestamp = Date.now();
    const newDay = (new Date()).getDay();

    userDispatch({ type: 'UPDATE_STREAK', creature: {
      id: creature.id,
      newCount,
      newTimestamp,
      newDay,
    }});
    
    return creature;
  }

  /// AUTO-UPDATE HOOKS ///

  // Updates age, streak, exp, and level
  useEffect(() => { 
    const birthTime = creature.birth_time;
    const newAge = age.getAge(birthTime);

    userDispatch({ type: 'UPDATE_AGE', creature: { newAge, id: creature.id } });

    const streak = checkCreatureStreak();
    if (streak === 'broken') resetCreatureStreak();

    if (!expUpdate) return;
    
    if (streak === 'increment' || creature.streak.count === 0) updateCreatureStreak();

    if (creature.exp >= creature.exp_goal || creature.is_noob) {
      levelUpSound.currentTime = 1;
        levelUpSound.play();
        
      const newLevel = creature.level + 1;

      userDispatch({ type: 'LEVEL_UP', creature: { id: creature.id, level: newLevel }});

      return toggleLevelUpdate();
    }

    toggleExpUpdate();
  }, [creature.exp]);

  // Updates creature multipliers
  useEffect(() => {
    if (!levelUpdate) return;

    const timer = setTimeout(() => {
      const difficulty = stats.getCreatureDifficulty(creature.purpose, creature.level);
      const multiplier = stats.getExpMultiplier(creature.level);

      userDispatch({ type: 'UPGRADE_MULTIPLIERS', creature: { id: creature.id, difficulty, multiplier }});

      const prevGoal = (creature.is_noob) ? 1 : creature.exp_goal;
      const newGoal = (creature.is_noob) ? 9 : stats.getExpGoal(creature.level, difficulty);

      userDispatch({ type: 'LEVEL_UPDATES', creature: {
        id: creature.id,
        prevGoal,
        newGoal,
      }});

      toggleExpUpdate();
      toggleLevelUpdate();

      if (creature.level === 15 || creature.level === 30 || creature.level === 50 || creature.level == 80) {
        const newPokeball = (creature.level === 30) ? 14
          : (creature.level === 50) ? 15 
          : (creature.level === 80) ? 16 
          : creature.pokeball_number;

        userDispatch({ type: 'UPDATE_POKEBALL', creature: {
          id: creature.id,
          newPokeball
        }});

        return toggleEvolve();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [levelUpdate]);

  // Evolves creature
  useEffect(() => {
    if (!evolve) return;
    
    const nextCreatureIndex = creature.evolutions.findIndex(being => being === creature.creature) + 1;
    if (!creature.evolutions[nextCreatureIndex]) return toggleEvolve();

    if (creature.evolutions[nextCreatureIndex] === 'none') {
      let newEvoLine = creature.evolutions;
        newEvoLine.splice(nextCreatureIndex, 1);
      console.log('newEvoLine', newEvoLine);

      return toggleEvolve();
    }

    setTimeout(() => {
      evolveSound.play();

      const nextCreature = creature.evolutions[nextCreatureIndex];

      userDispatch({
        type: 'EVOLVE',
        creature: {
          id: creature.id,
          nextCreature
        }
      });

      return toggleEvolve();
    }, 800);
  }, [evolve]);

  // Sends creature id to context and allows for
  // The selected creature's objectives to be shown
  const displayCreatureObjectives = () => {
    showCreatureObjectives(creature.id);
  }

  return (
    <div className="creature" style={{
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.6)), url(${img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <CreatureDisplay 
        creature={creature}
        displayObjectives={displayObjectives}
        displayCreatureObjectives={displayCreatureObjectives}
      />
    </div>
  )
}

export default Creature;
