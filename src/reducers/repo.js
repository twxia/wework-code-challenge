import produce from 'immer';
import {
  GET_REPO_SUCCESS,
  GET_REPO_PULLS_COUNT_SUCCESS,
  GET_REPO_STARGAZERS,
  GET_REPO_STARGAZERS_SUCCESS,
  CLEAR_REPO_STARGAZERS,
} from '@/constants/repo';

export const initialState = {
  list: {},
  stargazers: {
    nextPage: 1,
    totalPage: 1,
    list: [],
    isLoading: false,
  },
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case GET_REPO_SUCCESS:
        draft.list[payload.data.full_name] = payload.data;
        return;

      case GET_REPO_PULLS_COUNT_SUCCESS:
        if (!draft.list[payload.full_name]) {
          draft.list[payload.full_name] = {};
        }

        draft.list[payload.full_name].pulls_count = payload.count;
        draft.list[payload.full_name].isLoaded = true;
        return;

      case GET_REPO_STARGAZERS:
        draft.stargazers.isLoading = true;
        return;

      case GET_REPO_STARGAZERS_SUCCESS:
        draft.stargazers.list = draft.stargazers.list.concat(payload.list);
        draft.stargazers.nextPage = payload.nextPage;
        draft.stargazers.totalPage = payload.totalPage;
        draft.stargazers.isLoading = false;
        return;

      case CLEAR_REPO_STARGAZERS:
        draft.stargazers = {
          nextPage: 1,
          totalPage: 1,
          list: [],
          isLoading: false,
        };
        return;
    }
  });
