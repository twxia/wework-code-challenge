import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
`;

export function App({ }) {
  return (
    <div>
      <Title>REACT WAR ROOM</Title>
    </div>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);