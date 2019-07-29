import reducer, { initialState } from '../user';
import { getUserSuccess } from '@/actions/user';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle GET_USER_SUCCESS correctly', () => {
    const payload = { data: { login: 'test', id: 123 }};
    const result = { list: {} };

    result.list[payload.data.login] = payload.data;

    expect(reducer(undefined, getUserSuccess(payload))).toEqual(result);
  });
});
