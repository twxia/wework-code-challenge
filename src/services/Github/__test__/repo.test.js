import { getRepo, getRepoStargazers } from '../repo';
import { get } from '../rest';

const repo = 'facebook/react';

jest.mock('../rest', () => ({
  get: jest.fn((parameter) => true),
}));

describe('repo service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
      getRepoStargazers({ name: repo });

      expect(get).toHaveBeenCalledWith({
        endpoint: `/repos/${repo}/stargazers`,
      });
    });
  });
});
