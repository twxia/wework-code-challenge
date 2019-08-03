import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ALLIES, ENIMIES } from '@/constants/entities';
import Section from './Section';

const SectionTitle = styled.h2`  
`;

export function Main({ }) {
  return (
    <div data-testid={'main-component'}>
      <SectionTitle>
        ALLIES
      </SectionTitle>

      <Section repoName={ALLIES.react} />

      <SectionTitle>
        ENIMIES
      </SectionTitle>

      <Section repoName={ENIMIES.vue} />

      <Section repoName={ENIMIES.angular} />
    </div>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);