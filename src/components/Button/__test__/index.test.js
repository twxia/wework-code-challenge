import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
} from 'react-testing-library'
import 'jest-styled-components';
import Button from '../index';

describe('Buton', () => {
  it('should Button render correctly', () => {
    const { getByTestId } = render(<Button>click</Button>);
    const button = getByTestId('button');

    expect(button.innerHTML).toEqual('click');
  });

  it('should onClick function works correctly', () => {
    const mock = jest.fn();
    const { getByTestId } = render(<Button onClick={mock}>click</Button>);
    const button = getByTestId('button');

    fireEvent.click(button);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  afterEach(cleanup);
});
