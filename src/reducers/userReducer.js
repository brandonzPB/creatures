import * as streak from '../modules/streak';

const userReducer = (state, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        accessToken: action.user.accessToken,
        db_id: action.user.db_id,
        username: action.user.username,
        email: action.user.email,
        password: action.user.password,
        creatures: action.user.creatures.map(creature => {
          // updates streaks (if broken) and ages
          return {
            ...creature,
            streak_count: (streak.checkCreatureStreak(action.user.newDay, creature) === 'broken') 
              ? 0 : creature.streak_count,
            streak_timestamp: (streak.checkCreatureStreak(action.user.newDay, creature) === 'broken') 
              ? Date.now() - 86400000 : creature.streak_timestamp,
            streak_day: (streak.checkCreatureStreak(action.user.newDay, creature) === 'broken') 
              ? (new Date()).getDay() : creature.streak_day,
            age: (streak.getAge(action.user.newTime, creature.birth_time)),
          }
        }),
        new_day: action.user.newDay,
        new_time: action.user.newTime,
      };
    case 'POST_LOCAL_CREATURES':
      return {
        ...state,
        creatures: action.creatures.creatures
      };
    case 'UPDATE_CREATURES':
      return {
        ...state,
        creatures: action.creatures.creatures
      };
    case 'UPDATE_USER':
      return {
        ...state,
        username: action.user.username,
        email: action.user.email,
        password: action.user.password,
        creatures: action.user.creatures,
        updated: true
      };
    case 'ADD_CREATURE':
      return {
        ...state,
        creatures: [
          ...state.creatures,
          {
            creature: action.creature.creature,
            creature_name: action.creature.creature_name,
            purpose: action.creature.purpose,
            purpose_name: action.creature.purpose_name,
            evolutions: action.creature.evolutions,
            difficulty: action.creature.difficulty,
            multiplier: action.creature.multiplier,
            birth_date: action.creature.birth_date,
            birth_time: action.creature.birth_time,
            pokeball_number: action.creature.pokeball_number,
            id: action.creature.id,
            level: 1,
            exp: 0,
            exp_goal: 1,
            prev_exp_goal: 0,
            exp_surplus: 0,
            objectives: [],
            age: 0,
            is_noob: true,
            streak_count: 0,
            streak_timestamp: Date.now(),
            streak_day: action.creature.streak_day
          }
        ]
      };
    case 'UPDATE_CREATURE_INFO':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.creature.id) {
            return {
              ...creature,
              creature: action.creature.current,
              evolutions: action.creature.newEvos,
              creature_name: action.creature.name
            }
          }

          return creature;
        })
      };
    case 'ADD_OBJECTIVE':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.id) {
            return {
              ...creature,
              objectives: [
                ...creature.objectives,
                {
                  id: action.objective.id,
                  text: action.objective.text,
                  is_timed: action.objective.is_timed,
                  difficulty: action.objective.difficulty,
                  factor: action.objective.factor
                },
              ],
            };
          }

          return creature;
        })
      };
    case 'DELETE_OBJECTIVE':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.creatureId) {
            return {
              ...creature,
              objectives: creature.objectives.filter(obj => obj.id !== action.objectiveId)
            }
          }

          return creature;
        })
      };
    case 'ADD_EXP':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.creature.id) {
            return {
              ...creature,
              exp: action.creature.newTotal,
              exp_surplus: action.creature.newSurplus
            }
          }

          return creature;
        })
      };
    case 'UPDATE_STREAK':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.creature.id) {
            return {
              ...creature,
              streak_count: action.creature.newCount,
              streak_timestamp: Date.now(),
              streak_day: (new Date()).getDay()
            }
          }

          return creature;
        })
      };
    case 'LEVEL_UP':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.creature.id) {
            return {
              ...creature,
              level: action.creature.level,
              is_noob: false
            }
          }

          return creature;
        })
      };
    case 'UPGRADE_MULTIPLIERS':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.creature.id) {
            return {
              ...creature,
              difficulty: action.creature.difficulty,
              multiplier: action.creature.multiplier,
            }
          }

          return creature;
        })
      };
    case 'LEVEL_UPDATES':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.creature.id) {
            return {
              ...creature,
              prev_exp_goal: action.creature.prevGoal,
              exp_goal: action.creature.newGoal,
            }
          }

          return creature;
        })
      };
    case 'UPDATE_POKEBALL':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.creature.id) {
            return {
              ...creature,
              pokeball_number: action.creature.newPokeball,
            }
          }

          return creature;
        })
      };
    case 'EVOLVE':
      return {
        ...state,
        creatures: state.creatures.map(creature => {
          if (creature.id === action.creature.id) {
            return {
              ...creature,
              creature: action.creature.nextCreature,
            }
          }

          return creature;
        })
      };
    case 'DELETE_CREATURE':
      return {
        ...state,
        creatures: state.creatures.filter(creature => creature.id !== action.id)
      };
    case 'LOG_OUT':
      return {
        ...state,
        accessToken: null,
        db_id: null,
        username: null,
        email: null,
        password: null,
        creatures: [],
        newDay: 0,
        newTime: 0,
        updated: false,
      };
    default:
      return state;
  }
}

export default userReducer;
