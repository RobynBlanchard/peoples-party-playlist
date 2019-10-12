import React from 'react';
import styled, { keyframes } from 'styled-components';
import { media } from '../../globalStyles';

const flickerAnimation = keyframes`
  0% {
    transform: translate(-10px, 10px);
    color: white;
  }
  50% {
    color: grey;

  }
  100% {
    color: rgba(0, 0, 0, 0);
  }
`;

const MusicNote = styled.div`
  position: absolute;
  top: -5%;
  left: 70%;
  font-size: 22px;
  animation: ${flickerAnimation} 3s infinite ease-out;
  color: rgba(0, 0, 0, 0);
`;

const Icon = styled.img`
  height: 64px;
  ${media.desktop`height: 55px;`}
  ${media.phone`height: 40px;`}
  transform: translateY(8px);
`;

const Wrapper = styled.span`
  position: relative;
`;

const JukeboxAnimation = () => {
  return (
    <Wrapper>
      <Icon src={'images/jukebox.svg'} />
      <MusicNote>&#9835;</MusicNote>
    </Wrapper>
  );
};

export default JukeboxAnimation;
