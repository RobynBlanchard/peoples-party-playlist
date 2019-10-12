import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colours } from '../../globalStyles';

const scrollAnimation = keyframes`
  0% { opacity: 0; }
  10% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(15px); opacity: 0};
`;

const Scroll = styled.div`
  width: 3px;
  height: 4px;
  border-radius: 25%;
  background-color: ${colours.spotifyWhite};
  animation-name: ${scrollAnimation};
  animation-duration: 2.2s;
  animation-timing-function: cubic-bezier(0.15, 0.41, 0.69, 0.94);
  animation-iteration-count: infinite;
`;

const Wrapper = styled.div`
  width: 3px;
  padding: 6px 12px;
  height: 28px;
  border: 2px solid #fff;
  border-radius: 25px;
  opacity: 0.75;
`;

const Mouse = () => {
  return (
    <Wrapper>
      <Scroll />
    </Wrapper>
  );
};

export default Mouse;
