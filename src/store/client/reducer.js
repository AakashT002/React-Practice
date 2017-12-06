import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialClientsState = {
  clientValid: false,
  requesting: false,
  loading: false,
  clientList: [],
};

export const client = createReducer(initialClientsState, {
  [ActionTypes.FETCH_CLIENTS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_CLIENTS_SUCCESS](state, action) {
    return { ...state, clientList: action.response, requesting: false };
  },
  [ActionTypes.FETCH_CLIENTS_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default client;
