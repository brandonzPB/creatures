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
        creatures: action.user.storedCreatures,
      }
    default:
      return state;
  }
}

export default userReducer;
