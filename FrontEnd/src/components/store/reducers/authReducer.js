import actionTypes from "../actions/actionTypes";
import { AES } from 'crypto-js';
import config from "../../config/config";

const initState = {
  isLoggedIn: false,
  token: null,
  role: 0,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      const encryptedToken = AES.encrypt(action.data, config.SECRET_KEY).toString();
      const encryptedRole = AES.encrypt(action.role.toString(), config.SECRET_KEY).toString();
      return {
        ...state,
        isLoggedIn: action.data ? true : false,
        token: encryptedToken,
        role: encryptedRole || 0,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        role: 0,
      };
    default:
      return state;
  }
};

export default authReducer;
