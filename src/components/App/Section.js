import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import Link from '@/components/Link';
import { getRepo as getRepoAction } from '@/actions/repo';

const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  border: 1px solid ${props => props.theme.black};
  border-radius: 4px;
  position: relative;
  min-height: 160px;
`;

const Title = styled.h3`
`;

const Table = styled(Flex)`
  border: 1px solid ${props => props.theme.black};
  border-radius: 4px;
  min-height: 32px;
`;

const Inline = styled.span`
  white-space: nowrap;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Section({ repoName, repoDetail, getRepo, isInProfile }) {
  useEffect(() => {
    if (!repoDetail) {
      getRepo({ name: repoName });
    }
  }, []);

  return (
    <Wrapper flexDirection={'column'} my={3} p={[2, 3]}>
      <Title>
        <Link to={isInProfile ? repoDetail && repoDetail.html_url : `/profile/${repoName}`}>
          {repoDetail && repoDetail.name}
        </Link>
      </Title>
      <Box my={3}>
        {repoDetail && repoDetail.description}
      </Box>

      <Table mt={'auto'} justifyContent={'space-around'}>
        {repoDetail && repoDetail.isLoaded
          ? 
          <>
            <Box fontSize={[12, 2]} mx={[1, 3]} my={2}>{repoDetail && repoDetail.stargazers_count.toLocaleString()} STARS</Box>
            <Box fontSize={[12, 2]} mx={[1, 3]} my={2}>{repoDetail && repoDetail.open_issues_count.toLocaleString()} ISSUES</Box>
            <Box fontSize={[12, 2]} mx={[1, 3]} my={2}>{repoDetail && repoDetail.forks_count.toLocaleString()} FORK</Box>
            <Box fontSize={[12, 2]} mx={[1, 3]} my={2}>{repoDetail && repoDetail.pulls_count.toLocaleString()} <Inline>PULL REQUEST</Inline></Box>
          </>
          :
          <Center>Loading...</Center> 
        }
      </Table>
    </Wrapper>
  );
}

const mapStateToProps = (state, ownProps) => ({
  repoDetail: state.repo.list[ownProps.repoName],
});

const mapDispatchToProps = dispatch => ({
  getRepo: ({ name }) => dispatch(getRepoAction({ name })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
