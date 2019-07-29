import { get } from './rest';

export const getUser = ({ name }) =>
  get({
    endpoint: `/users/${name}`,
  });
