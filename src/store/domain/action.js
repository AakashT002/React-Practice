import * as ActionTypes from '../actionTypes';
import Domains from '../../services/Domains';

export const loadDomains = () => ({
  types: [
    ActionTypes.FETCH_DOMAINS_REQUEST,
    ActionTypes.FETCH_DOMAINS_SUCCESS,
    ActionTypes.FETCH_DOMAINS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.get();
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export default loadDomains;
