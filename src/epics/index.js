import { combineEpics } from 'redux-observable';

import system from './system';
import repo from './repo';
import user from './user';

export const epics = [...system, ...repo, ...user];

export default combineEpics(...epics);
