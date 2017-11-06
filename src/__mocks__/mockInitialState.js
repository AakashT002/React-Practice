import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import './mockSessionStorage.js';

export const mockInitialState = {
  user: { userName: '' },
};

const middlewares = [thunk];

export const mockStore = configureStore(middlewares);
