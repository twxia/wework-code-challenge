import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import { Route, Switch, Link } from 'react-router-dom';
import { ENTITIES } from '@/constants/entities';
import Main from './Main';
import Profile from './Profile';

const Title = styled.h1`
`;

export function App({ }) {
  return (
    <Box width={['auto', 600]} mx={[18, 'auto']}>
      <Title>
        <Link to={'/'}>
          REACT WAR ROOM
        </Link>
      </Title>

      <Switch>
        <Route path={'/'} exact component={Main} />
        <Route path={`/profile/:name(${ENTITIES.join('|')})`} exact component={Profile} />
        <Route exact component={Main} />
      </Switch>
    </Box>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);