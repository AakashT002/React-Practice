import * as ActionTypes from '../actionTypes';
import Roles from '../../services/Roles';

export const saveRole = roleObject => ({
  types: [
    ActionTypes.CREATE_ROLE_REQUEST,
    ActionTypes.CREATE_ROLE_SUCCESS,
    ActionTypes.CREATE_ROLE_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Roles.createRole(roleObject);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const loadRoles = domain_name => ({
  types: [
    ActionTypes.FETCH_ROLE_REQUEST,
    ActionTypes.FETCH_ROLE_SUCCESS,
    ActionTypes.FETCH_ROLE_FAILURE,
  ],
  callAPI: async () => {
    try {
       return await Roles.getRoles(domain_name);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});
