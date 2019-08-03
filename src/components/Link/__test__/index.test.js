import React from 'react';
import {
  cleanup,
} from '@testing-library/react'
import 'jest-styled-components';
import renderWithReduxAndRouter from '@/utils/testing/renderWithReduxAndRouter';
import Link from '../index';

describe('Link', () => {
  it('should Link render correctly', () => {
    const { getByTestId } = renderWithReduxAndRouter(<Link>link</Link>);
    const link = getByTestId('internal-link');

    expect(link.textContent).toEqual('link');
  });

  it('should Link render internal link correctly', () => {
    const { getByTestId } = renderWithReduxAndRouter(<Link to={'/abc'} />);
    const link = getByTestId('internal-link');

    expect(link).toBeDefined();
  });

  it('should Link render external link correctly', () => {
    const { getByTestId } = renderWithReduxAndRouter(<Link to={'https://abc.com'} />);
    const link = getByTestId('external-link');

    expect(link).toBeDefined();
  });

  afterEach(cleanup);
});
