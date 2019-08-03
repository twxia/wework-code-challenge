import React from 'react';
import {
  cleanup,
  fireEvent,
} from 'react-testing-library';
import renderWithReduxAndRouter from '@/utils/testing/renderWithReduxAndRouter';
import 'jest-styled-components';
import { Profile } from '../Profile';


describe('Profile', () => {
  const createProfile = ({ overwriteProps } = {}) => {
    const props = {
      match: {
        params: {
          name: '/facebook/react',
        },
      },
      stargazers: {
        list: [
          {
            login: 'abc',
          },
          {
            login: 'def',
          },
        ],
        isLoading: false,
        
      },
      users: {
        abc: {
          name: 'mr.abc',
          html_url: 'url',
        },
        def: {
          name: 'mrs.def',
          html_url: 'url2',
        },
      },
      getRepoStargazers: jest.fn(),
      clearRepoStargazers: jest.fn(),
      ...overwriteProps,
    };

    return {
      ...renderWithReduxAndRouter(<Profile { ...props }/>),
      mockGetRepoStargazers: props.getRepoStargazers,
      mockClearRepoStargazers: props.clearRepoStargazers,
    };
  }

  it('should render correctly', () => {
    const { getAllByTestId } = createProfile();

    const wrapper = getAllByTestId('profile-wrapper');

    expect(wrapper.length).toEqual(2);
  });

  describe('useInfiniteScroll', () => {
    afterEach(() => {
      Object.defineProperty(document.documentElement, 'offsetHeight', {
        configurable: true,
        get () {
          return 0;
        },
      });

      Object.defineProperty(document.documentElement, 'scrollTop', {
        configurable: true,
        get () {
          return 0;
        },
      });
    })

    it('should works correctly when render', () => {
      const { mockGetRepoStargazers } = createProfile();
      
      expect(mockGetRepoStargazers).toHaveBeenCalledTimes(1);
    });

    it('should works correctly when loading', () => {
      const { mockGetRepoStargazers } = createProfile({
        overwriteProps: {
          stargazers: {
            list: [
              {
                login: 'abc',
              },
              {
                login: 'def',
              },
            ],
            isLoading: true,  
          },
        },
      });

      fireEvent.scroll(window);
      
      expect(mockGetRepoStargazers).toHaveBeenCalledTimes(1);
    });

    it('should works correctly when scroll position is not in the threshold', () => {
      const { mockGetRepoStargazers } = createProfile();

      Object.defineProperty(document.documentElement, 'offsetHeight', {
        configurable: true,
        get () {
          return 2000;
        },
      });

      Object.defineProperty(document.documentElement, 'scrollTop', {
        configurable: true,
        get () {
          return 1;
        },
      });

      fireEvent.scroll(window);
      
      expect(mockGetRepoStargazers).toHaveBeenCalledTimes(1);
    });

    it('should works correctly when scroll position is in the threshold', () => {
      const { mockGetRepoStargazers } = createProfile();

      Object.defineProperty(document.documentElement, 'offsetHeight', {
        configurable: true,
        get () {
          return 2000;
        },
      });

      Object.defineProperty(document.documentElement, 'scrollTop', {
        configurable: true,
        get () {
          return 1999;
        },
      });

      fireEvent.scroll(window);
      
      expect(mockGetRepoStargazers).toHaveBeenCalledTimes(2);
    });

    it('should call clear after component unmounted', () => {
      const { mockClearRepoStargazers, unmount } = createProfile();

      unmount();
      
      expect(mockClearRepoStargazers).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(cleanup);
});
