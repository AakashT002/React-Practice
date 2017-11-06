import * as ActionTypes from '../actionTypes';

export const authenticate = user => ({ type: ActionTypes.AUTHENTICATE, user });

export const logout = () => ({ type: ActionTypes.LOGOUT });

export function setUserName(userName) {
  return { type: ActionTypes.SET_USERNAME, userName };
}

