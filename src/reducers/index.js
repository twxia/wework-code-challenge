import { combineReducers } from 'redux';

import system from './system';
import repo from './repo';

export const reducers = {
  system,
  repo,
};

export default combineReducers(reducers);
