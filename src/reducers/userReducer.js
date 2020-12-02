const userReducer = (state, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        accessToken: action.user.accessToken,
        db_id: action.user.db_id,
        username: action.user.username,
        email: action.user.email,
        creatures: action.user.creatures,
      }
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
            streak_day: (new Date()).getDay(),
          }
        ]
      };
    case 'DELETE_CREATURE':
      return {
        ...state,
        creatures: state.creatures.filter(creature => creature.id !== action.creature.id)
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
      };
    default:
      return state;
  }
}

export default userReducer;
