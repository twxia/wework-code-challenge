import React from 'react';
import {
  render,
  cleanup,
} from 'react-testing-library'
import 'jest-styled-components';
import ThemeProvider from '../index';

describe('ThemeProvider', () => {
  it('should render correctly', () => {
    render(<ThemeProvider />);

    const style = window.document.head.querySelector('style');

    expect(style).toBeDefined();
    expect(style).toMatchSnapshot();
  });

  afterEach(cleanup);
});
