import { get, post, rootEndpoint } from '../rest';
import fetch from 'isomorphic-fetch';

const githubRootEndpoint = 'https://api.github.com';

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
      };

      const result = post(payload);

      expect(fetch).toHaveBeenCalledWith(`${rootEndpoint}${payload.endpoint}`, {
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
      };

      const result = get(payload);

      expect(fetch).toHaveBeenCalledWith(`${rootEndpoint}${payload.endpoint}`);
      expect(result).resolves.toBe('result');
    });
  });
});
