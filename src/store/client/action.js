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

export const updateClient = (clientObject, id) => ({
  types: [
    ActionTypes.UPDATE_CLIENT_REQUEST,
    ActionTypes.UPDATE_CLIENT_SUCCESS,
    ActionTypes.UPDATE_CLIENT_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Clients.updateClient(clientObject, id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleClientDeletion = (id, currentdomainName) => ({
  types: [
    ActionTypes.DELETE_CLIENT_REQUEST,
    ActionTypes.DELETE_CLIENT_SUCCESS,
    ActionTypes.DELETE_CLIENT_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Clients.delete(id, currentdomainName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export function stopClientSpinner() {
  return { type: ActionTypes.STOP_CLIENT_SPINNER };
}
