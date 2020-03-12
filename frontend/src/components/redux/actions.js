export const loginUser = user => {
  return {
    type: 'LOGIN_USER',
    user_details: user
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  };
};

export const getUserDetails = () => {
  return {
    type: 'GET_USER_DETAILS'
  };
};

export const toggleLoading = () => {
  return {
    type: 'TOGGLE_LOADING'
  };
};
