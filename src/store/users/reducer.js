import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialUsersState = {
  users: [],
  requesting: false,
};

export const users = createReducer(initialUsersState, {
  [ActionTypes.FETCH_USERS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_USERS_SUCCESS](state, action) {
    return { ...state, users: action.response, requesting: false };
  },
  [ActionTypes.FETCH_USERS_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.ADD_BLANK_USER_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.ADD_BLANK_USER_SUCCESS](state, action) {
    return { ...state, users: action.response, requesting: false };
  },
  [ActionTypes.ADD_BLANK_USER_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default users;
