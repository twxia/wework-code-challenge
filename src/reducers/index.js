import { combineReducers } from 'redux';

import system from './system';
import repo from './repo';
import user from './user';

export const reducers = {
  system,
  repo,
  user,
};

export default combineReducers(reducers);
