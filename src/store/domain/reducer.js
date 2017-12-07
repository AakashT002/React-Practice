import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialDomainsState = {
  domainList: [],
  domainValid: false,
  requesting: false,
  domainName: '',
  loading: false,
  responseHeaderArray: [],
};

let newState;
export const domain = createReducer(initialDomainsState, {
  [ActionTypes.VALIDATE_DOMAIN_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.VALIDATE_DOMAIN_SUCCESS](state) {
    return { ...state, requesting: false, domainValid: false };
  },
  [ActionTypes.VALIDATE_DOMAIN_FAILURE](state) {
    return { ...state, requesting: false, domainValid: true };
  },
  [ActionTypes.FETCH_DOMAINS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_DOMAINS_SUCCESS](state, action) {
    return { ...state, domainList: action.response, requesting: false };
  },
  [ActionTypes.FETCH_DOMAINS_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.FETCH_USERS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_USERS_SUCCESS](state, action) {
    return { ...state, domainList: action.response, requesting: false };
  },
  [ActionTypes.FETCH_USERS_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.FETCH_CLIENTS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_CLIENTS_SUCCESS](state, action) {
    return { ...state, domainList: action.response, requesting: false };
  },
  [ActionTypes.FETCH_CLIENTS_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.FETCH_ROLES_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_ROLES_SUCCESS](state, action) {
    return { ...state, domainList: action.response, requesting: false };
  },
  [ActionTypes.FETCH_ROLES_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.SET_DOMAINNAME](state = initialDomainsState, action) {
    return Object.assign({}, state, {
      domainName: action.domainName,
    });
  },
  [ActionTypes.VALIDATE_CLIENT](state, action) {
    return { ...state, requesting: false, clientValid: action.isClientValid };
  },
  [ActionTypes.CREATE_DOMAIN_REQUEST](state, action) {
    newState = Object.assign({}, state);
    newState.responseHeaderArray.push(action.response);
    newState.responseHeader = action.response;
    newState.requesting = false;
    return newState;
  },
  [ActionTypes.CREATE_DOMAIN_SUCCESS](state) {
    return { ...state, loading: false };
  },
  [ActionTypes.CREATE_DOMAIN_FAILURE](state) {
    return { ...state, loading: false };
  },
  [ActionTypes.DELETE_REALM_REQUEST](state) {
    return { ...state, loading: true };
  },
  [ActionTypes.DELETE_REALM_SUCCESS](state) {
    return { ...state, loading: false };
  },
  [ActionTypes.DELETE_REALM_FAILURE](state) {
    return { ...state, loading: false };
  },
});

export default domain;
