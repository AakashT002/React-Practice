import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialUserState = {
  id: null,
  isAuthenticated: false,
  name: null,
  userName: null,
  userRoles: [],
};

export const user = createReducer(initialUserState, {
  [ActionTypes.AUTHENTICATE](state, action) {
    const { id, name } = action.user;
    return { ...state, isAuthenticated: true, id, name };
  },
  [ActionTypes.LOGOUT](state) {
    return { ...state, ...initialUserState };
  },
  [ActionTypes.SET_USERNAME](state = initialUserState, action) {
    return Object.assign({}, state, {
      userName: action.userName,
    });
  },
  [ActionTypes.GET_USER_ROLE_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.GET_USER_ROLE_SUCCESS](state, action) {
    return { ...state, requesting: false, userRoles: action.response };
  },
  [ActionTypes.GET_USER_ROLE_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default user;
