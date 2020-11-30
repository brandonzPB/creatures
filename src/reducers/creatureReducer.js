import { v4 as uuidv4 } from 'uuid';

const creatureReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_CREATURE':
      return [...state, {
        creature: action.creature.creature,
        creatureName: action.creature.creatureName,
        purpose: action.creature.purpose,
        purposeName: action.creature.purposeName,
        id: uuidv4(),
        sprite: `./sprites/pkmnXY/${action.creature.creature.toLowerCase()}.gif`,
        level: 1,
        exp: 0,
        expGoal: 1,
        prevGoal: 0,
        expSurplus: 0,
        difficulty: action.creature.difficulty,
        multiplier: action.creature.multiplier,
        objectives: [],
        birthdate: action.creature.birthdate,
        birthTime: action.creature.birthTime,
        age: 0,
        isNoob: true,
        evolutionaryLine: [...action.creature.evolutionaryLine],
        pokeballNumber: action.creature.pokeballNumber,
        streak: {
          count: 0,
          timestamp: Date.now(),
          day: (new Date()).getDay()
        }
      }];
    case 'RESET_BAR':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            prevGoal: action.creature.prevGoal,
            expSurplus: action.creature.surplus,
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
            expSurplus: action.creature.newSurplus,
          }
        }

        return creature;
      });
    case 'RESET_STREAK':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            streak: action.creature.newStreak
          }
        }

        return creature;
      });
    case 'UPDATE_STREAK':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            streak: action.creature.newStreak
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
            prevGoal: action.creature.prevGoal,
            expGoal: action.creature.newGoal,
            isNoob: false,
          }
        }

        return creature;
      });
    case 'UPDATE_POKEBALL':
      return state.map(creature => {
        if (creature.id === action.creature.id) {
          return {
            ...creature,
            pokeballNumber: action.creature.newPokeball
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
    default:
      return state;
  }
}

export default creatureReducer;
