import reducer, { initialState } from '../repo';
import { getRepoSuccess, getRepoPullsCountSuccess } from '@/actions/repo';

describe('repo reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle GET_REPO_SUCCESS correctly', () => {
    const payload = { data: { full_name: 'test/repo', id: 321 }};
    const result = { list: {} };

    result.list[payload.data.full_name] = payload.data;

    expect(reducer(undefined, getRepoSuccess(payload))).toEqual(result);
  });

  it('should handle GET_REPO_PULLS_COUNT_SUCCESS correctly', () => {
    const payload = { name: 'test/repo', count: 321 };
    const result = { list: {} };

    result.list[payload.name] = {};
    result.list[payload.name].pulls_count = payload.count;
    result.list[payload.name].isLoaded = true;

    expect(reducer(undefined, getRepoPullsCountSuccess(payload))).toEqual(result);
  });
});
