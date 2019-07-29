
import { of, from } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { getUser } from '@/services/Github/user';
import { getUserSuccess } from '@/actions/user';
import { GET_USER } from '@/constants/user';

export const getUserEpic = action$ =>
  action$.pipe(
    ofType(GET_USER),
    mergeMap(({ payload }) =>
      from(getUser(payload)).pipe(
        switchMap((data) => of(
          getUserSuccess({ data }),
        ))
      ),
    ),
  );

export default [
  getUserEpic,
];
