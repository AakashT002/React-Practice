import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { loginReducer } from 'react-redux-modules/lib/reducers/loginReducer';
import count from './count/reducer';
import items from './items/reducer';
import user from './user/reducer';
import addUser from './addUser/reducer';
import domain from './domain/reducer';
import client from './client/reducer';
import role from './roles/reducer';

const root = combineReducers({
  router: routerReducer,
  count,
  items,
  user,
  addUser,
  domain,
  client,
  role,
  ...loginReducer('loginForm'),
});

export default root;
