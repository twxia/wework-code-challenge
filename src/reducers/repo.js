import produce from 'immer';
import { GET_REPO_SUCCESS, GET_REPO_PULLS_COUNT_SUCCESS } from '@/constants/repo';

export const initialState = {
  list: {},
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
    }
  });
