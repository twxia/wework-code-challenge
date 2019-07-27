import { ActionsObservable } from 'redux-observable';
import { dismissMessageEpic } from '../system';
import { updateMessage as updateMessageAction } from '@/actions/system';
import { delay } from 'rxjs/operators';

jest.mock('rxjs/operators', () => {
  const operators = jest.requireActual('rxjs/operators');
  operators.delay = jest.fn(() => (s) => s);
  return operators;
});

describe('system epics', () => {
  describe('dismissMessageEpic', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should send clear message action after 2 seconds', (done) => {
      const payload = {
        message: 'sup?',
      };
      const action = ActionsObservable.of(updateMessageAction(payload));

      dismissMessageEpic(action)
        .subscribe((actual) => {
          expect(actual).toEqual(updateMessageAction({ message: '' }));
          expect(delay).toHaveBeenCalledWith(2000);
        }, null, done);
    });

    it('should not send clear message action if already cleared', (done) => {
      const payload = {
        message: '',
      };
      const action = ActionsObservable.of(updateMessageAction(payload));

      dismissMessageEpic(action)
        .subscribe((actual) => {
          expect(actual).toBeFalsy();
        }, null, done);
    });
  });
});
