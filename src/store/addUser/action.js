import * as ActionTypes from '../actionTypes';
import User from '../../services/User';

export const handleUserCreation = (realm, userObj) => ({

  types: [
    ActionTypes.CREATE_USER_REQUEST,
    ActionTypes.CREATE_USER_SUCCESS,
    ActionTypes.CREATE_USER_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.add(realm, userObj);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleUserDeletion = (str, index) => ({

  types: [
    ActionTypes.DELETE_USER_REQUEST,
    ActionTypes.DELETE_USER_SUCCESS,
    ActionTypes.DELETE_USER_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.delete(str, index);

    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleUserValidation = (userName, realmName) => ({
  types: [
    ActionTypes.VALIDATE_USER_REQUEST,
    ActionTypes.VALIDATE_USER_SUCCESS,
    ActionTypes.VALIDATE_USER_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.handleUserValidation(userName, realmName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleEmailValidation = (email, realmName) => ({
  types: [
    ActionTypes.VALIDATE_EMAIL_REQUEST,
    ActionTypes.VALIDATE_EMAIL_SUCCESS,
    ActionTypes.VALIDATE_EMAIL_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.handleEmailValidation(email, realmName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});


export function setResponseHeader() {
  return { type: ActionTypes.SET_RESPONSEHEADER };
}
