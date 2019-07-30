import { get } from './rest';

export const retrievePageNumber = (str, isNext) => {
  if (typeof str !== 'string') {
    return -1;
  }

  const matched = str.match(new RegExp(`.*&page=(\\d+).*; rel="${isNext ? 'next' : 'last'}"`));

  if (matched) {
    return Number(matched[1]) || -1;
  }
  return -1;
}

export const getRepo = ({ name }) =>
  get({
    endpoint: `/repos/${name}`,
  });

export const getRepoStargazers = ({ name, page = 1 }) =>
  get({
    endpoint: `/repos/${name}/stargazers`,
    request: {
      page,
    },
    isCustomized: true,
  })
    .then(response => Promise.all([
      response.json(),
      response.headers,
    ]))
    .then(response => ({
      body: response[0],
      nextPage: retrievePageNumber(response[1].get('Link'), true),
      totalPages: retrievePageNumber(response[1].get('Link')),
    }));

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
      totalPages: retrievePageNumber(response[1].get('Link')),
    }));
