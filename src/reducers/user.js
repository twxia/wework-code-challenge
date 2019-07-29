import produce from 'immer';
import { GET_USER_SUCCESS } from '@/constants/user';

export const initialState = {
  list: {},
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case GET_USER_SUCCESS:
        draft.list[payload.data.login] = payload.data;
        return;
    }
  });
