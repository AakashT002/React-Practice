import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialTeamsState = {
  teamList: [],
  requesting: false,
  message: '',
  saving: false,
  isError: false,
  isTeamSaved: false,
  teamId: '',
};

export const team = createReducer(initialTeamsState, {
  [ActionTypes.CREATE_TEAM_REQUEST](state) {
    return { ...state, requesting: true, isError: false, };
  },
  [ActionTypes.CREATE_TEAM_SUCCESS](state, action) {
    return {
      ...state,
      requesting: false,
      message: 'Saved',
      isError: false,
      saving: true,
      isTeamSaved: true,
      teamId: action.response,
    };
  },
  [ActionTypes.CREATE_TEAM_FAILURE](state, action) {
    return {
      ...state,
      requesting: false,
      isError: true,
      message: action.error.message,
      saving: false,
    };
  },
  [ActionTypes.FETCH_TEAMS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_TEAMS_SUCCESS](state, action) {
    return { ...state, teamList: action.response, requesting: false };
  },
  [ActionTypes.FETCH_TEAMS_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default team;
