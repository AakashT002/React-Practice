import * as ActionTypes from '../actionTypes';
import Clients from '../../services/Clients';

export const loadClients = currentdomainName => ({
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

export const saveClient = clientObject => ({
  types: [
    ActionTypes.CREATE_CLIENT_REQUEST,
    ActionTypes.CREATE_CLIENT_SUCCESS,
    ActionTypes.CREATE_CLIENT_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Clients.createClient(clientObject);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export function addClient() {
  return { type: ActionTypes.ADD_CLIENT };
}
