import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fonts } from '../../../styles.js';

const Title = styled.div`
  display: flex;
  flex-direction: row;
  text-shadow: 2px 2px 2px #000000;
  font-family: ${fonts.title};
  text-transform: uppercase;
  font-size: 44px;
`;
const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Copy = styled.p`
  font-family: ${fonts.font1};
  font-size: 16px;
`;

const keyFrameMoveUp = keyframes`
   50% {
    transform: translateY(-50px);
    color: #1db954;
  }
`;

const Woo = styled.h2`
  padding: 0 24px;
  animation: ${keyFrameMoveUp} 2s ease-in-out infinite;
`;

const SectionOne = () => {
  return (
    <Head>
      <Title>
        <h2>People's Party Playlist</h2>
        <Woo>\o/</Woo>
      </Title>
      <Copy>The ultimate online jukebox experience</Copy>
    </Head>
  );
};

export default SectionOne;
