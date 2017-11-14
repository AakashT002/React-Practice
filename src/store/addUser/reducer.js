import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialUsersState = {
  users: [],
  responseHeaderArray: [],
  requesting: false,
  userValid: false,
  emailValid: false,
};


let newState;
export const addUser = createReducer(initialUsersState, {

  [ActionTypes.CREATE_USER_REQUEST](state) {

    return { ...state, responseHeader: '', requesting: false };
  },

  [ActionTypes.CREATE_USER_SUCCESS](state, action) {
    newState = Object.assign({}, state);
    newState.responseHeaderArray.push(action.response);
    newState.responseHeader = action.response;
    newState.requesting = false;
    return newState;
  },

  [ActionTypes.CREATE_USER_FAILURE](state, action) {
    return { ...state, responseHeader: action.response, requesting: false };
  },

  [ActionTypes.DELETE_USER_REQUEST](state) {
    return { ...state, requesting: true };
  },

  [ActionTypes.DELETE_USER_SUCCESS](state, action) {
    newState = Object.assign({}, state);
    if (newState.responseHeaderArray.length > 0) {
      newState.responseHeaderArray.splice(action.response, 1);
      newState.requesting = false;
    }
    else if (newState.responseHeaderArray.length === 0) {
      newState.responseHeaderArray = [];
      newState.requesting = false;
    }
    return newState;
  },

  [ActionTypes.DELETE_USER_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.VALIDATE_USER_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.VALIDATE_USER_SUCCESS](state, action) {
    return { ...state, requesting: false, userValid: action.response };
  },
  [ActionTypes.VALIDATE_USER_FAILURE](state) {
    return { ...state, requesting: false, userValid: false };
  },
    [ActionTypes.VALIDATE_EMAIL_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.VALIDATE_EMAIL_SUCCESS](state, action) {
    return { ...state, requesting: false, emailValid: action.response };
  },
  [ActionTypes.VALIDATE_EMAIL_FAILURE](state) {
    return { ...state, requesting: false, emailValid: false };
  },
   [ActionTypes.SET_RESPONSEHEADER](state = initialUsersState) {
    return Object.assign({}, state, {
      userValid: false,
      emailValid: false,
    });
  },
});


export default addUser;