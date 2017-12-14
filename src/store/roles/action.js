import * as ActionTypes from '../actionTypes';
import Roles from '../../services/Roles';

export const saveRole = (roleObject, domainName) => ({
  types: [
    ActionTypes.CREATE_ROLE_REQUEST,
    ActionTypes.CREATE_ROLE_SUCCESS,
    ActionTypes.CREATE_ROLE_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Roles.createRole(roleObject, domainName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const loadRoles = domainName => ({
  types: [
    ActionTypes.FETCH_ROLE_REQUEST,
    ActionTypes.FETCH_ROLE_SUCCESS,
    ActionTypes.FETCH_ROLE_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Roles.getRoles(domainName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export const handleRoleDeletion = (roleId, currentdomainName) => ({
  types: [
    ActionTypes.DELETE_ROLE_REQUEST,
    ActionTypes.DELETE_ROLE_SUCCESS,
    ActionTypes.DELETE_ROLE_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Roles.delete(roleId, currentdomainName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export function stopRoleSpinner() {
  return { type: ActionTypes.STOP_ROLE_SPINNER };
}
