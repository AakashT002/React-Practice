import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialDomainsState = {
  domainList: [],
  domainValid: false,
  requesting: false,
};

export const domain = createReducer(initialDomainsState, {
  [ActionTypes.VALIDATE_DOMAIN_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.VALIDATE_DOMAIN_SUCCESS](state) {
    return { ...state, requesting: false, domainValid: true };
  },
  [ActionTypes.VALIDATE_DOMAIN_FAILURE](state) {
    return { ...state, requesting: false, domainValid: false };
  },
  [ActionTypes.FETCH_DOMAINS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_DOMAINS_SUCCESS](state, action) {
    return { ...state, domainList: action.response };
  },
  [ActionTypes.FETCH_DOMAINS_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default domain;
