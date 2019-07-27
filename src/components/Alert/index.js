import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box } from '@rebass/grid';

const AlertComponent = styled(Box)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.blue};
  border: 1px solid ${props => props.theme.blue};
  box-shadow: 0 2px 4px 0 rgba(123, 123, 123, 0.3);
  border-radius: 4px;
  transition: opacity 0.2s ease-in-out;
  pointer-events: ${props => props.isVisible ? 'initial' : 'none'};
  opacity: ${props => props.isVisible ? 1 : 0};
`;

export function Alert({ message }) {
  const cacheMessage = useRef(message);

  useEffect(() => {
    cacheMessage.current = message;
  }, [message]);

  return (
    <AlertComponent
      data-testid={'alert-wrapper'}
      px={3}
      py={2}
      isVisible={!!message}
    >
      {message ? message : cacheMessage.current}
    </AlertComponent>
  );
}

const mapStateToProps = (state) => ({
  message: state.system.message,
});

export default connect(mapStateToProps, null)(Alert);