import fetch from 'isomorphic-fetch';
import { stringify } from 'query-string';
export const rootEndpoint = 'https://api.github.com';

export const post = ({ endpoint, body, request }) =>
  fetch(`${rootEndpoint}${endpoint}?client_id=94bab41828685a1e4ebd&client_secret=738f17bee9aff30e3690a8c8f6e80967c50e3623&${stringify(request)}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());

export const get = ({ endpoint, request, isCustomized }) =>
  fetch(`${rootEndpoint}${endpoint}?client_id=94bab41828685a1e4ebd&client_secret=738f17bee9aff30e3690a8c8f6e80967c50e3623&${stringify(request)}`)
    .then((response) => isCustomized ? response : response.json());
