const creatureReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_CREATURE':
      return [...state, {
        creature: action.creature.creature,
        creature_name: action.creature.creatureName,
        purpose: action.creature.purpose,
        purpose_name: action.creature.purposeName,
        id: action.creature.id,
        sprite: `./sprites/pkmnXY/${action.creature.creature.toLowerCase()}.gif`,
        level: 1,
        exp: 0,
        exp_goal: 1,
        prev_exp_goal: 0,
        exp_surplus: 0,
        difficulty: action.creature.difficulty,
        multiplier: action.creature.multiplier,
        objectives: [],
        birth_date: action.creature.birthdate,
        birth_time: action.creature.birthTime,
        age: 0,
        is_noob: true,
        evolutions: [...action.creature.evolutions],
        pokeball_number: action.creature.pokeballNumber,
        streak_count: 0,
        streak_timestamp: Date.now(),
        streak_day: (new Date()).getDay(),
      }];
    case 'RESET_BAR':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            prev_exp_goal: action.creature.prevGoal,
            exp_surplus: action.creature.surplus,
          }
        }

        return creature;
      });
    case 'UPDATE_AGE':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            age: action.creature.newAge
          }
        }

        return creature;
      });
    case 'ADD_EXP':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            exp: action.creature.newTotal,
            exp_surplus: action.creature.newSurplus,
          }
        }

        return creature;
      });
    case 'RESET_STREAK':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            streak_count: action.creature.newCount,
            streak_timestamp: action.creature.newTimestamp,
            streak_day: action.creature.newDay
          }
        }

        return creature;
      });
    case 'UPDATE_STREAK':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            streak_count: action.creature.newCount,
            streak_timestamp: action.creature.newTimestamp,
            streak_day: action.creature.newDay
          }
        }

        return creature;
      });
    case 'LEVEL_UP':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            level: action.creature.level,
          }
        }

        return creature;
      });
    case 'UPGRADE_MULTIPLIERS':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            difficulty: action.creature.difficulty,
            multiplier: action.creature.multiplier
          }
        }

        return creature;
      });
    case 'LEVEL_UPDATES':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            prev_exp_goal: action.creature.prevGoal,
            exp_goal: action.creature.newGoal,
            is_noob: false,
          }
        }

        return creature;
      });
    case 'UPDATE_POKEBALL':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            pokeball_number: action.creature.newPokeball
          }
        }

        return creature;
      });
    case 'EVOLVE':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            creature: action.creature.nextCreature,
            sprite: `../sprites/pkmnXY/${action.creature.nextCreature}.gif`,
          }
        }

        return creature;
      });
    case 'TOGGLE_OBJECTIVES_DISPLAY':
      return (state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            objectivesDisplayed: !creature.objectivesDisplayed
          }
        }

        return creature;
      }));
    case 'ADD_OBJECTIVE': 
      return state.map(creature => {
        if (creature.id === action.creatureId) {
          return {
            ...creature,
            objectives: [
              ...creature.objectives,
              action.objective
            ]
          }
        }

        return creature;
      })
    case 'DELETE_OBJECTIVE':
      return state.map(creature => {
        if (creature.id === action.creatureId) {
          const objectiveArr = creature.objectives.filter(item => item.id !== action.item);

          return {
            ...creature,
            objectives: objectiveArr
          }
        }

        return creature;
      })
    case 'DELETE_CREATURE':
      return state.filter(creature => creature.id !== action.id);
    case 'LOG_OUT':
      return [];
    default:
      return state;
  }
}

export default creatureReducer;
