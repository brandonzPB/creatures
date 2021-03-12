import React, { useState, useEffect, useContext } from 'react';
import { CreatureContext } from '../../contexts/CreatureContext';
import { UserContext } from '../../contexts/UserContext';

import CreatureDisplay from './CreatureDisplay';

import * as stats from '../../modules/stats';
import * as streakMethods from '../../modules/streak';

import './creature.css';

const lvlUpMusicSrc = require('../../sounds/level-up.mp3');
const levelUpSound = new Audio(lvlUpMusicSrc);

const evolveMusicSrc = require('../../sounds/evolve.mp3');
const evolveSound = new Audio(evolveMusicSrc);

const Creature = ({ creature }) => {
  const { showCreatureObjectives, expUpdate, toggleExpUpdate, finish } = useContext(CreatureContext);

  const { user, userDispatch } = useContext(UserContext);

  const [levelUpdate, setLevelUpdate] = useState(false);
  
  const [evolve, setEvolve] = useState(false);

  const pokeball = (!creature.pokeball_number) ? 13
    : (creature.pokeball_number < 14) ? 13 // pokeball
    : (creature.pokeball_number === 100) ? 100 // ancient pokeball
    : (creature.pokeball_number === 14) ? 1 // greatball
    : (creature.pokeball_number === 15) ? 0 : 11; // ultraball : masterball

  const img = require(`../../images/pokeballs/${pokeball}.png`);

  const toggleLevelUpdate = () => {
    setLevelUpdate(!levelUpdate);
  }

  const toggleEvolve = () => {
    setEvolve(!evolve);
  }

  /// AUTO-UPDATE HOOKS ///

  // HOOK: EXP + STREAK UPDATE
  useEffect(() => { 
    if (!expUpdate) return;
    let isNewLevel = false;
    if (creature.level === 100) return finish('creature', creature, 'stats');

    // check streak
    const streak = streakMethods.checkCreatureStreak(creature.streak_timestamp, creature.streak_count, user.new_time);
    console.log('streak', streak);

    // update streak
    if (streak === 'increment') {
      console.log('Updating streak...');
      streakMethods.updateCreatureStreak(creature, user, userDispatch);
    }
    
    // check if new level
    if (creature.exp >= creature.exp_goal || creature.is_noob) {
      levelUpSound.currentTime = 1;
        levelUpSound.play();
        
      const newLevel = creature.level + 1;

      userDispatch({ type: 'LEVEL_UP', creature: { id: creature.id, level: newLevel }});
      
      isNewLevel = true;
    }

    toggleExpUpdate();

    if (isNewLevel) {
      return toggleLevelUpdate();
    } else {
      return finish('creature', creature, 'stats');
    }
  }, [creature.exp]);

  // HOOK: NEW LEVEL UPDATES
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

      toggleLevelUpdate();

      if (creature.level === 15 || creature.level === 30 || creature.level === 50 || creature.level === 80 || creature.level === 100) {
        const newPokeball = (creature.level === 30) ? 14
          : (creature.level === 50) ? 15 
          : (creature.level === 80) ? 16 
          : (creature.level === 100) ? 100
          : creature.pokeball_number;

        userDispatch({ type: 'UPDATE_POKEBALL', creature: {
          id: creature.id,
          newPokeball
        }});

        return toggleEvolve();
      } else {
        return finish('creature', creature, 'stats');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [levelUpdate]);

  // HOOK: EVOLVE
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

      userDispatch({ type: 'EVOLVE', creature: {
        id: creature.id,
        nextCreature
      }});

      finish('creature', creature, 'stats');

      return toggleEvolve();
    }, 300);
  }, [evolve]);

  // Sends creature id to context and allows for
  // The selected creature's objectives to be shown
  const showObjectives = () => {
    showCreatureObjectives(creature.id);
    finish('creature', creature, 'stats');
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
        showObjectives={showObjectives}
      />
    </div>
  )
}

export default Creature;
