import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { media } from '../../globalStyles';

export const IconImg = styled.img`
  height: 100%;
`;

const Icon = ({ isPlaying }) => {
  const img = isPlaying ? 'volume' : 'pause-circle-regular';
  return <IconImg src={`images/${img}.svg`} />;
};

export default Icon;
