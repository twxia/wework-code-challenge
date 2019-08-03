import { of, from } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
  getRepo,
  getRepoPullsOnePerPage,
  getRepoStargazers,
} from '@/services/Github/repo';
import {
  getRepoSuccess,
  getRepoPullsOnePerPage as getRepoPullsOnePerPageAction,
  getRepoPullsCountSuccess,
  getRepoStargazersSuccess,
} from '@/actions/repo';
import { getUser } from '@/actions/user';
import {
  GET_REPO,
  GET_REPO_STARGAZERS,
  GET_REPO_PULLS_ONE_PER_PAGE,
} from '@/constants/repo';

export const getRepoEpic = action$ =>
  action$.pipe(
    ofType(GET_REPO),
    mergeMap(({ payload }) =>
      from(getRepo(payload)).pipe(
        switchMap(data =>
          of(getRepoSuccess({ data }), getRepoPullsOnePerPageAction(payload))
        )
      )
    )
  );

export const getRepoPullsOnePerPageEpic = action$ =>
  action$.pipe(
    ofType(GET_REPO_PULLS_ONE_PER_PAGE),
    mergeMap(({ payload }) =>
      from(getRepoPullsOnePerPage(payload)).pipe(
        switchMap(data =>
          of(
            getRepoPullsCountSuccess({
              name: payload.name,
              count: data.totalPages,
            })
          )
        )
      )
    )
  );

export const getRepoStargazersEpic = action$ =>
  action$.pipe(
    ofType(GET_REPO_STARGAZERS),
    switchMap(({ payload }) =>
      from(getRepoStargazers(payload)).pipe(
        switchMap(({ body: list, nextPage, totalPages }) =>
          of(
            getRepoStargazersSuccess({ list, nextPage, totalPages }),
            ...list.map(user => getUser({ name: user.login }))
          )
        )
      )
    )
  );

export default [getRepoEpic, getRepoPullsOnePerPageEpic, getRepoStargazersEpic];
