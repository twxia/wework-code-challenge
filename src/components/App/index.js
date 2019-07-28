import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import Section from './Section';

const Title = styled.h1`
`;

const SectionTitle = styled.h2`  
`;

export function App({ }) {
  return (
    <Box width={['auto', 600]} mx={[18, 'auto']}>
      <Title>REACT WAR ROOM</Title>

      <SectionTitle>
        ALLIES
      </SectionTitle>

      <Section repoName={'facebook/react'} />

      <SectionTitle>
        ENIMIES
      </SectionTitle>

      <Section repoName={'vuejs/vue'} />

      <Section repoName={'angular/angular'} />
    </Box>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);