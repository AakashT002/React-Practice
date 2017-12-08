import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialDomainsState = {
	roleList: [],
	requesting: false,
	message: '',
	saving: false,
	roleId: '',
};

export const role = createReducer(initialDomainsState, {
	[ActionTypes.CREATE_ROLE_REQUEST](state) {
		return { ...state, requesting: true, message: '' };
	},
	[ActionTypes.CREATE_ROLE_SUCCESS](state,action) {
		return { ...state, requesting: false, message: 'Registered', saving: true, roleId: action.response };
	},
	[ActionTypes.CREATE_ROLE_FAILURE](state) {
		return { ...state, requesting: false, message: 'Bussiness Error', saving: false };
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
});

export default role;
