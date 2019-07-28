import fetch from 'isomorphic-fetch';

export const rootEndpoint = 'https://api.github.com';

export const post = ({ endpoint, body }) =>
  fetch(`${rootEndpoint}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());

export const get = ({ endpoint, isCustomized }) =>
  fetch(`${rootEndpoint}${endpoint}`)
    .then((response) => isCustomized ? response : response.json());
