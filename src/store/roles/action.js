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
