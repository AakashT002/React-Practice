import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialTeamsState = {
  teamList: [],
  requesting: false,
  message: '',
  saving: false,
  teamId: '',
};

export const role = createReducer(initialDomainsState, {
  [ActionTypes.CREATE_TEAM_REQUEST](state) {
    return { ...state, requesting: true, message: '' };
  },
  [ActionTypes.CREATE_TEAM_SUCCESS](state, action) {
    return {
      ...state,
      requesting: false,
      message: 'Registered',
      saving: true,
      teamId: action.response,
    };
  },
  [ActionTypes.CREATE_TEAM_FAILURE](state) {
    return {
      ...state,
      requesting: false,
      message: 'Bussiness Error',
      saving: false,
    };
  },
  [ActionTypes.FETCH_TEAMS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_TEAMS_SUCCESS](state, action) {
    return { ...state, roleList: action.response, requesting: false };
  },
  [ActionTypes.FETCH_TEAMS_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default role;
