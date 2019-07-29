import { ActionsObservable } from 'redux-observable';
import { getUserEpic } from '../user';
import {
  getUser,
  getUserSuccess,
} from '@/actions/user';

jest.mock('@/services/Github/user', () => ({
  getUser: jest.fn(() => Promise.resolve('data')),
}));


describe('user epics', () => {
  describe('getUserEpic', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch user data then send action correctly', (done) => {
      const payload = { name: 'test' };
      const action = ActionsObservable.of(getUser(payload));

      getUserEpic(action)
        .subscribe((actual) => {
          expect(actual).toEqual(getUserSuccess({ data: 'data' }));
        }, null, done);
    });
  });
});
