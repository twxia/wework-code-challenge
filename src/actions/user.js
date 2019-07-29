import {
  GET_USER,
  GET_USER_SUCCESS,
} from '@/constants/user';

export const getUser = ({ name }) => ({
  type: GET_USER,
  payload: {
    name,
  },
});

export const getUserSuccess = ({ data }) => ({
  type: GET_USER_SUCCESS,
  payload: {
    data,
  },
});
