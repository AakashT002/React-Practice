import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialDomainsState = {
  roleList: [],
  requesting: false,
  showMessageForRole: '',
  saving: false,
  roleId: '',
};

export const role = createReducer(initialDomainsState, {
  [ActionTypes.CREATE_ROLE_REQUEST](state) {
    return { ...state, requesting: true, showMessageForRole: '' };
  },
  [ActionTypes.CREATE_ROLE_SUCCESS](state, action) {
    return {
      ...state,
      requesting: false,
      showMessageForRole: 'Registered',
      saving: true,
      roleId: action.response,
    };
  },
  [ActionTypes.CREATE_ROLE_FAILURE](state) {
    return {
      ...state,
      requesting: false,
      showMessageForRole: 'Bussiness Error',
      saving: false,
    };
  },
  [ActionTypes.FETCH_ROLE_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_ROLE_SUCCESS](state, action) {
    return { ...state, roleList: action.response, requesting: false };
  },
  [ActionTypes.FETCH_ROLE_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.DELETE_ROLE_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.DELETE_ROLE_SUCCESS](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.DELETE_ROLE_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default role;
