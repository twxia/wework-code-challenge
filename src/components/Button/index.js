import React from 'react';
import styled, { css } from 'styled-components';
import { clickableStyle } from '@/constants/styles';

const primaryCss = css`
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.blue};
  text-transform: uppercase;
  ${props => clickableStyle({
    bgColor: props.theme.blue,
    borderColor: props.theme.blue,
  })}
`;

export const ButtonComponent = styled.button`
  text-align: center;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${props => props.theme.white};;
  color: ${props => props.theme.blue};
  border: solid 1px ${props => props.theme.blue};
  box-shadow: 0 2px 4px 0 rgba(123, 123, 123, 0.3);

  ${props => clickableStyle({
    bgColor: props.theme.white,
    borderColor: props.theme.blue,
  })}
  ${props => props.isPrimary && primaryCss}
`;

const Button = ({
  isPrimary,
  onClick,
  className,
  children,
}) => (
  <ButtonComponent
    data-testid={'button'}
    isPrimary={isPrimary}
    onClick={onClick}
    className={className}
  >
    {children}
  </ButtonComponent>
);

export default Button;