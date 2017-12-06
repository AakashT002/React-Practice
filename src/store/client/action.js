import * as ActionTypes from '../actionTypes';
import Clients from '../../services/Clients';

export const loadClients = (currentdomainName) => ({
  types: [
    ActionTypes.FETCH_CLIENTS_REQUEST,
    ActionTypes.FETCH_CLIENTS_SUCCESS,
    ActionTypes.FETCH_CLIENTS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Clients.get(currentdomainName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});