import React from 'react';
import {
  wait,
  cleanup,
} from '@testing-library/react';
import 'jest-styled-components';
import renderWithReduxAndRouter from '@/utils/testing/renderWithReduxAndRouter';
import { ENTITIES } from '@/constants/entities';
import { App } from '../index';


describe('index', () => {
  it('should App render correctly', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />);

    expect(getByTestId('loading-display').textContent).toEqual('Loading...');
  });

  it('should App render correctly when route is undefined', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, { route: '/yo' });

    let component;
    await wait(() => component = getByTestId('main-component'));
    expect(component).toBeDefined();
  });

  it('should default route render correctly', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />);

    let component;
    await wait(() => component = getByTestId('main-component'));
    expect(component).toBeDefined();
  });

  test.each(ENTITIES)(
    'should profile route render %s correctly',
    async (entity) => {
      const { getByTestId } = renderWithReduxAndRouter(<App />, { route: `/profile/${entity}` });

      let component;
      await wait(() => component = getByTestId('profile-component'));
      expect(component).toBeDefined();
    }
  );

  afterEach(cleanup);
});
