import React from 'react';
import {
  render,
  cleanup,
} from 'react-testing-library'
import 'jest-styled-components';
import { Alert } from '../index';

describe('Alert', () => {
  it('should render correctly if no message gave', () => {
    const { getByTestId } = render(<Alert message={''} />);
    const alertWrapper = getByTestId('alert-wrapper');

    expect(alertWrapper).toHaveStyleRule('opacity', '0');
    expect(alertWrapper).toHaveStyleRule('pointer-events', 'none');
  });

  it('should render correctly if message gave', () => {
    const { getByTestId } = render(<Alert message={'hi there'} />);
    const alertWrapper = getByTestId('alert-wrapper');

    expect(alertWrapper).toHaveStyleRule('opacity', '1');
    expect(alertWrapper).toHaveStyleRule('pointer-events', 'initial');
  });

  afterEach(cleanup);
});
