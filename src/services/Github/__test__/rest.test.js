import { get, post, rootEndpoint } from '../rest';
import fetch from 'isomorphic-fetch';

const githubRootEndpoint = 'https://api.github.com';
const params = '?client_id=94bab41828685a1e4ebd&client_secret=738f17bee9aff30e3690a8c8f6e80967c50e3623&';

jest.mock('isomorphic-fetch', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ json: jest.fn(() => 'result') })),
}));

describe('rest service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should root endpoint set correctly', () => {
    expect(rootEndpoint).toBe(githubRootEndpoint);
  });

  describe('post', () => {
    it('should call correctly', () => {
      const payload = {
        endpoint: '/user/one',
        body: 'body',
        request: {
          test: 168,
        },
      };

      const result = post(payload);

      expect(fetch).toHaveBeenCalledWith(`${rootEndpoint}${payload.endpoint}${params}test=168`, {
        method: 'POST',
        body: JSON.stringify(payload.body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      expect(result).resolves.toBe('result');
    });
  });

  describe('get', () => {
    it('should call correcly', () => {
      const payload = {
        endpoint: '/user/one',
        request: {
          test: 168,
        },
      };

      const result = get(payload);

      expect(fetch).toHaveBeenCalledWith(`${rootEndpoint}${payload.endpoint}${params}test=168`);
      expect(result).resolves.toBe('result');
    });
  });
});
