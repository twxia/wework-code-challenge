import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { fromEvent } from 'rxjs';
import { throttleTime, filter } from 'rxjs/operators';
import Link from '@/components/Link';
import Section from './Section';
import { getRepoStargazers as getRepoStargazersAction, clearRepoStargazers as clearRepoStargazersAction } from '@/actions/repo';

const ProfileWrapper = styled(Box)`
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.2s ease-in-out;
`;

const ProfileLink = styled(Link)`
  display: block;
  text-decoration: none;
`;

export function Profile({ match, stargazers, users, getRepoStargazers, clearRepoStargazers }) {
  const repoName = match.params.name;
  const stargazerList = stargazers.list;
  const isStargazerListLoading = stargazers.isLoading;
  const nextStargazerListPage = stargazers.nextPage;

  useEffect(() => {
    if (!stargazerList.length) {
      getRepoStargazers({ name: repoName });
    }
    return () => clearRepoStargazers();
  }, []);

  useEffect(() => {
    const scroll$ = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(150),
        filter(() => !isStargazerListLoading)
      )
      .subscribe(() => {
        const scrollTopRatio = (window.innerHeight + document.documentElement.scrollTop) / document.documentElement.offsetHeight;
  
        if (scrollTopRatio > 0.85) {
          getRepoStargazers({ name: repoName, page: nextStargazerListPage });
        }
      });
    return () => scroll$.unsubscribe();
  }, [nextStargazerListPage, isStargazerListLoading]);

  return (
    <>
      <Section isInProfile repoName={repoName} />

      <Flex flexWrap={'wrap'}>
        {
          stargazerList.map(stargazer => (  
            <ProfileWrapper width={[0.5, 0.33]} p={[2, 3]} isVisible={users[stargazer.login]}>
              <ProfileLink href={users[stargazer.login] && users[stargazer.login].html_url} target={'_blank'} rel={'noopener noreferrer'}>
                <Flex>
                  <Flex width={0.3} alignItems={'center'}>
                    <img src={stargazer.avatar_url} width={'100%'} loading={'lazy'} />
                  </Flex>
                  <Flex width={0.7} alignItems={'center'} ml={2}>
                    {users[stargazer.login] && (users[stargazer.login].name || stargazer.login)}
                  </Flex>
                </Flex>
              </ProfileLink>
            </ProfileWrapper>
          ))
        }
      </Flex>
    </>
  );
}

const mapStateToProps = (state) => ({
  stargazers: state.repo.stargazers,
  isLoading: state.repo.stargazers.isLoading,
  stargazersNextPage: state.repo.stargazers.nextPage,
  users: state.user.list,
});

const mapDispatchToProps = dispatch => ({
  getRepoStargazers: ({ name, page }) => dispatch(getRepoStargazersAction({ name, page })),
  clearRepoStargazers: () => dispatch(clearRepoStargazersAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);