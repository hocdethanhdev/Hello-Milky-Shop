import actionTypes from "../actions/actionTypes";

const initState = {
  isLoggedIn: false,
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.data ? true : false,
        token: action.data
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null
      }
    default:
      return state;
  }
};

export default authReducer;
