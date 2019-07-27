import { combineReducers } from 'redux';

import system from './system';

export const reducers = {
  system,
};

export default combineReducers(reducers);
