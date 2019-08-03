import React from 'react';
import {
  cleanup,
} from '@testing-library/react';
import renderWithReduxAndRouter from '@/utils/testing/renderWithReduxAndRouter';
import 'jest-styled-components';
import { Section } from '../Section';


describe('Section', () => {
  const createSection = ({ overwriteProps } = {}) => {
    const props = {
      repoName: '/facebook/react',
      repoDetail: {
        stargazers_count: 100,
        open_issues_count: 10,
        forks_count: 11,
        pulls_count: 12,
        isLoaded: true,
        description: 'hi',
        name: 'react',
        html_url: 'https://github.com',
      },
      isInProfile: false,
      getRepo: jest.fn(),
      ...overwriteProps,
    };

    return {
      ...renderWithReduxAndRouter(<Section { ...props }/>),
      mockGetRepo: props.getRepo,
    };
  }

  it('should getRepo not to be called after render', async () => {
    const { mockGetRepo: mockGetRepo } = createSection();

    expect(mockGetRepo).toHaveBeenCalledTimes(0);
  });

  it('should getRepo be called correctly after render', async () => {
    const { mockGetRepo: mockGetRepo } = createSection({
      overwriteProps: {
        repoDetail: null,
      },
    });

    expect(mockGetRepo).toHaveBeenCalledTimes(1);
  });

  it('should render link correctly', () => {
    const { getByTestId: getByTestIdOne } = createSection({ 
      overwriteProps: {
        isInProfile: true,
      },
    });

    expect(getByTestIdOne('external-link')).toBeDefined();

    const { getByTestId: getByTestIdTwo } = createSection();

    expect(getByTestIdTwo('internal-link')).toBeDefined();
  });

  it('should render content correctly', () => {
    const { getByTestId } = createSection();

    expect(getByTestId('stars-block').textContent).toEqual('100 STARS');
    expect(getByTestId('issues-block').textContent).toEqual('10 ISSUES');
    expect(getByTestId('fork-block').textContent).toEqual('11 FORK');
    expect(getByTestId('pr-block').textContent).toEqual('12 PULL REQUEST');
    expect(getByTestId('description-block').textContent).toEqual('hi');
    expect(getByTestId('internal-link').textContent).toEqual('react');
  });

  it('should render content correctly when data hasn\'t loaded', () => {
    const { getByTestId } = createSection({
      overwriteProps: {
        repoDetail: null,
      },
    });

    expect(getByTestId('content-block').textContent).toEqual('Loading...');
  });

  afterEach(cleanup);
});
