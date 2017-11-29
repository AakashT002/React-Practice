import * as ActionTypes from '../actionTypes';
import User from '../../services/User';

export const authenticate = user => ({ type: ActionTypes.AUTHENTICATE, user });

export const logout = () => ({ type: ActionTypes.LOGOUT });

export function setUserName(userName) {
  return { type: ActionTypes.SET_USERNAME, userName };
}

export const getUserRoles = () => ({
  types: [
    ActionTypes.GET_USER_ROLE_REQUEST,
    ActionTypes.GET_USER_ROLE_SUCCESS,
    ActionTypes.GET_USER_ROLE_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.getRoles();
    } catch (error) {
      throw new Error(error.message);
    }
  },
});
