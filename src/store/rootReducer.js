import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { loginReducer } from 'react-redux-modules/lib/reducers/loginReducer';
import count from './count/reducer';
import items from './items/reducer';
import user from './user/reducer';
import addUser from './addUser/reducer';
import domain from './domain/reducer';
import users from './users/reducer';
import client from './client/reducer';
import role from './roles/reducer';
import team from './team/reducer';

const root = combineReducers({
  router: routerReducer,
  count,
  items,
  user,
  users,
  addUser,
  domain,
  client,
  role,
  team,
  ...loginReducer('loginForm'),
});

export default root;
