import * as ActionTypes from '../actionTypes';
import Domains from '../../services/Domains';

export const saveDomain = realmObj => ({
  types: [
    ActionTypes.CREATE_DOMAIN_REQUEST,
    ActionTypes.CREATE_DOMAIN_SUCCESS,
    ActionTypes.CREATE_DOMAIN_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.post(realmObj);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const validate = domainName => ({
  types: [
    ActionTypes.VALIDATE_DOMAIN_REQUEST,
    ActionTypes.VALIDATE_DOMAIN_SUCCESS,
    ActionTypes.VALIDATE_DOMAIN_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.validate(domainName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export function validateClient(isClientValid) {
  return { type: ActionTypes.VALIDATE_CLIENT, isClientValid };
}

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

export function setDomainName(domainName) {
  return { type: ActionTypes.SET_DOMAINNAME, domainName };
}


export default loadDomains;