const initState = {
  isLogged: false
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, {
        isLogged: true
      });
    default:
      return state;
  }
};

export default rootReducer;
