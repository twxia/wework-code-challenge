import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import Section from './Section';
import { getRepoStargazers as getRepoStargazersAction } from '@/actions/repo';

const ProfileWrapper = styled(Box)`
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.2s ease-in-out;
`;

export function Profile({ match, stargazers, users, getRepoStargazers }) {
  const repoName = match.params.name;
  useEffect(() => {
    if (!stargazers.length) {
      getRepoStargazers({ name: repoName });
    }
  }, []);

  return (
    <>
      <Section repoName={repoName} />

      <Flex flexWrap={'wrap'}>
        {
          stargazers.map(stargazer => (  
            <ProfileWrapper width={[0.5, 0.33]} p={[2, 3]} isVisible={users[stargazer.login]}>
              <Flex>
                <Flex width={0.3} alignItems={'center'}>
                  <img src={stargazer.avatar_url} width={'100%'} loading={'lazy'} />
                </Flex>
                <Flex width={0.7} alignItems={'center'} ml={2}>
                  {users[stargazer.login] && (users[stargazer.login].name || stargazer.login)}
                </Flex>
              </Flex>
            </ProfileWrapper>
          ))
        }
      </Flex>
    </>
  );
}

const mapStateToProps = (state) => ({
  stargazers: state.repo.stargazers.list,
  users: state.user.list,
});

const mapDispatchToProps = dispatch => ({
  getRepoStargazers: ({ name }) => dispatch(getRepoStargazersAction({ name })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);