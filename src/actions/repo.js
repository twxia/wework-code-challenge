import {
  GET_REPO,
  GET_REPO_SUCCESS,
  GET_REPO_STARGAZERS,
  GET_REPO_STARGAZERS_SUCCESS,
  GET_REPO_PULLS_ONE_PER_PAGE,
  GET_REPO_PULLS_COUNT_SUCCESS,
  CLEAR_REPO_STARGAZERS,
} from '@/constants/repo';

export const getRepo = ({ name }) => ({
  type: GET_REPO,
  payload: {
    name,
  },
});

export const getRepoSuccess = ({ data }) => ({
  type: GET_REPO_SUCCESS,
  payload: {
    data,
  },
});

export const getRepoStargazers = ({ name, page = 1 }) => ({
  type: GET_REPO_STARGAZERS,
  payload: {
    name,
    page,
  },
});

export const getRepoStargazersSuccess = ({ list, nextPage, totalPages }) => ({
  type: GET_REPO_STARGAZERS_SUCCESS,
  payload: {
    list,
    nextPage,
    totalPages,
  },
});

export const clearRepoStargazers = () => ({
  type: CLEAR_REPO_STARGAZERS,
});

export const getRepoPullsOnePerPage = ({ name }) => ({
  type: GET_REPO_PULLS_ONE_PER_PAGE,
  payload: {
    name,
  },
});

export const getRepoPullsCountSuccess = ({ name, count }) => ({
  type: GET_REPO_PULLS_COUNT_SUCCESS,
  payload: {
    full_name: name,
    count,
  },
})
