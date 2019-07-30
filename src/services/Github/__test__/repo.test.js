import { retrievePageNumber, getRepo, getRepoStargazers, getRepoPullsOnePerPage } from '../repo';
import { get } from '../rest';

const repo = 'facebook/react';

jest.mock('../rest', () => ({
  get: jest.fn(() => 
    Promise.resolve({
      json: jest.fn(() => 'result'),
      headers: {
        get: jest.fn(() => 'result'),
      },
    })
  ),
}));

describe('repo service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrievePageNumber works correctly', () => {
    const str = '<https://api.github.com/repositories/24195339/pulls?client_id=94bab41828685a1e4ebd&client_secret=738f17bee9aff30e3690a8c8f6e80967c50e3623&page=1&per_page=1&state=open>; rel="prev", <https://api.github.com/repositories/24195339/pulls?client_id=94bab41828685a1e4ebd&client_secret=738f17bee9aff30e3690a8c8f6e80967c50e3623&page=3&per_page=1&state=open>; rel="next", <https://api.github.com/repositories/24195339/pulls?client_id=94bab41828685a1e4ebd&client_secret=738f17bee9aff30e3690a8c8f6e80967c50e3623&page=427&per_page=1&state=open>; rel="last", <https://api.github.com/repositories/24195339/pulls?client_id=94bab41828685a1e4ebd&client_secret=738f17bee9aff30e3690a8c8f6e80967c50e3623&page=1&per_page=1&state=open>; rel="first"';

    expect(retrievePageNumber(str, true)).toBe(3);
    expect(retrievePageNumber(str)).toBe(427);
    expect(retrievePageNumber(123)).toBe(-1);
  })

  describe('getRepo', () => {
    it('should get correcly', () => {
      getRepo({ name: repo });

      expect(get).toHaveBeenCalledWith({
        endpoint: `/repos/${repo}`,
      });
    });
  });

  describe('getRepoStargazers', () => {
    it('should get correcly', () => {
      getRepoStargazers({ name: repo, page: 2 });

      expect(get).toHaveBeenCalledWith({
        endpoint: `/repos/${repo}/stargazers`,
        isCustomized: true,
        request: {
          page: 2,
        },
      });
    });
  });

  describe('getRepoPullsOnePerPage', () => {
    it('should get correcly', () => {
      getRepoPullsOnePerPage({ name: repo });

      expect(get).toHaveBeenCalledWith({
        endpoint: `/repos/${repo}/pulls`,
        isCustomized: true,
        request: {
          page: 1,
          per_page: 1,
          state: 'open',
        },
      });
    });
  });
});
