import { UPDATE_MESSAGE } from '@/constants/system';

export const updateMessage = ({ message }) => ({
  type: UPDATE_MESSAGE,
  payload: {
    message,
  },
});
