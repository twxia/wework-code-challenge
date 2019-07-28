
import { of, from } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { getRepo, getRepoPullsOnePerPage } from '@/services/Github/repo';
import { getRepoSuccess, getRepoPullsOnePerPage as getRepoPullsOnePerPageAction, getRepoPullsCountSuccess } from '@/actions/repo';
import { GET_REPO, GET_REPO_PULLS_ONE_PER_PAGE } from '@/constants/repo';

export const getRepoEpic = action$ =>
  action$.pipe(
    ofType(GET_REPO),
    mergeMap(({ payload }) =>
      from(getRepo(payload)).pipe(
        switchMap((data) => of(
          getRepoSuccess({ data }),
          getRepoPullsOnePerPageAction(payload)
        )))
    )
  );

export const getRepoPullsOnePerPageEpic = action$ =>
  action$.pipe(
    ofType(GET_REPO_PULLS_ONE_PER_PAGE),
    mergeMap(({ payload }) =>
      from(getRepoPullsOnePerPage(payload)).pipe(
        switchMap((data) => of(
          getRepoPullsCountSuccess({ name: payload.name, count: data.totalPages })
        )))
    )
  );

export default [
  getRepoEpic,
  getRepoPullsOnePerPageEpic,
];
