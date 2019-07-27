import { combineEpics } from 'redux-observable';

import system from './system';

export const epics = [...system];

export default combineEpics(...epics);
