import { get } from './rest';

export const getRepo = ({ name }) =>
  get({
    endpoint: `/repos/${name}`,
  });

export const getRepoStargazers = ({ name }) =>
  get({
    endpoint: `/repos/${name}/stargazers`,
  });

export const getRepoPullsOnePerPage = ({ name }) =>
  get({
    endpoint: `/repos/${name}/pulls`,
    request: {
      state: 'open',
      page: 1,
      per_page: 1,
    },
    isCustomized: true,
  })
    .then(response => Promise.all([
      response.json(),
      response.headers,
    ]))
    .then(response => ({
      body: response[0],
      totalPages: Number(response[1].get('Link').match(/,.*&page=(\d*)&.*; rel="last"/)[1]),
    }));
