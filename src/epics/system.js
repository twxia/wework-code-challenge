import { of } from 'rxjs';
import { switchMap, filter, delay } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { updateMessage as updateMessageAction } from '@/actions/system';
import { UPDATE_MESSAGE } from '@/constants/system';

export const dismissMessageEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_MESSAGE),
    filter(({ payload: { message } }) => message !== ''),
    switchMap(() => of(updateMessageAction({ message: '' }))),
    delay(2000)
  );

export default [dismissMessageEpic];
