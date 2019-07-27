import produce from 'immer';
import { UPDATE_MESSAGE } from '@/constants/system';

export const initialState = {
  message: '',
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case UPDATE_MESSAGE:
        draft.message = payload.message;
        return;
    }
  });
