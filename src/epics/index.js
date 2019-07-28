import { combineEpics } from 'redux-observable';

import system from './system';
import repo from './repo';

export const epics = [...system, ...repo];

export default combineEpics(...epics);
