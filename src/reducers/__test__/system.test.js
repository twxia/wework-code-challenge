import reducer, { initialState } from '../system';
import { updateMessage as updateMessageAction } from '@/actions/system';

describe('system reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle UPDATE_MESSAGE correctly', () => {
    const message = 'hi there';
    const result = { message: '' };
    result.message = message;

    expect(reducer({}, updateMessageAction({ message }))).toEqual(result);
  });
});
