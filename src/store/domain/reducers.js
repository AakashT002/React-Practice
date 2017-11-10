import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialItemsState = {
  domainList: [],
  requesting: false,
};

export const domains = createReducer(initialItemsState, {
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

export default domains;
