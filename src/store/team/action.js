import * as ActionTypes from '../actionTypes';
import Teams from '../../services/Teams';

export const loadTeams = domainName => ({
  types: [
    ActionTypes.FETCH_TEAMS_REQUEST,
    ActionTypes.FETCH_TEAMS_SUCCESS,
    ActionTypes.FETCH_TEAMS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.getTeams(domainName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export const saveTeam = teamObject => ({
  types: [
    ActionTypes.CREATE_TEAM_REQUEST,
    ActionTypes.CREATE_TEAM_SUCCESS,
    ActionTypes.CREATE_TEAM_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.createTeam(teamObject);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

