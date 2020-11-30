const userReducer = (state, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        username: action.user.username,
        email: action.user.email,
        password: action.user.password,
        creatures: action.user.creatures,
      }
    case 'GET_LOCAL_CREATURES':
      return {
        ...state,
        creatures: action.user.creatures
      };
    default:
      return state;
  }
}

export default userReducer;
