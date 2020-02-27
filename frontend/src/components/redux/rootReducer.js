const initState = {
  isLogged: false,
  isLoading: true
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, {
        isLogged: true,
        isLoading: false
      });
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        isLogged: false
      });
    case 'GET_USER_DETAILS':
      return Object.assign({}, state, {
        user_details: action.user_details
      });
    case 'TOGGLE_LOADING':
      return Object.assign({}, state, {
        isLoading: !state.isLoading
      });
    default:
      return state;
  }
};

export default rootReducer;
