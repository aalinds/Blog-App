export const loginUser = () => {
  return {
    type: 'LOGIN_USER'
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  };
};

export const getUserDetails = user_details => {
  return {
    type: 'GET_USER_DETAILS',
    user_details
  };
};

export const toggleLoading = () => {
  return {
    type: 'TOGGLE_LOADING'
  };
};
