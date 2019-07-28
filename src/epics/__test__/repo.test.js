import { ActionsObservable } from 'redux-observable';
import { getRepoEpic, getRepoPullsOnePerPageEpic } from '../repo';
import { zip, of } from 'rxjs';
import {
  getRepo as getRepoAction,
  getRepoSuccess,
  getRepoPullsOnePerPage as getRepoPullsOnePerPageAction,
  getRepoPullsCountSuccess,
} from '@/actions/repo';

jest.mock('@/services/Github/repo', () => ({
  getRepo: jest.fn(() => Promise.resolve('data')),
  getRepoPullsOnePerPage: jest.fn(() => Promise.resolve({ totalPages: 123 })),
}));


describe('repo epics', () => {
  describe('getRepoEpic', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch repo data then send action correctly', (done) => {
      const payload = { name: 'test' };
      const action = ActionsObservable.of(getRepoAction(payload));

      const expected = [
        getRepoSuccess({ data: 'data' }),
        getRepoPullsOnePerPageAction({ ...payload }),
      ];

      zip(
        getRepoEpic(action),
        of(...expected)
      )
        .subscribe((result) => {
          expect(result[0]).toEqual(result[1]);
        }, null, done);
    });
  });

  describe('getRepoPullsOnePerPageEpic', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch pr data then send action correctly', (done) => {
      const payload = { name: 'test' };
      const action = ActionsObservable.of(getRepoPullsOnePerPageAction(payload));

      getRepoPullsOnePerPageEpic(action)
        .subscribe((actual) => {
          expect(actual).toEqual(getRepoPullsCountSuccess({ ...payload, count: 123 }));
        }, null, done);
    });
  });
});
