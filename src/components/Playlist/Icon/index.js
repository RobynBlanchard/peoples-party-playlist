import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { media } from '../../../styles/index.js';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100%;
  ${media.tablet`width: 10%;padding: 0 32px;`}
`;

export const IconImg = styled.img`
  height: 20px;
  width: 20px;

  ${media.tablet`height: 32px;width: 32px;`}
`;

const Icon = ({ isPlaying }) => {
  const img = isPlaying ? 'volume' : 'pause-circle-regular';
  return (
    <Wrapper>
      <IconImg src={`images/${img}.svg`} />
    </Wrapper>
  );
};

export default Icon;
