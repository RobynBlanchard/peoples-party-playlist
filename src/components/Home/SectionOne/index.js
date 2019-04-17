import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colours, constants, fonts } from '../../../styles.js';

const keyFrameMoveInLeft = keyframes`
   0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  80% {
    transform: translateX(20px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
`;

const trackingInExpand = keyframes`
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

const keyFrameMoveUp = keyframes`
   50% {
    transform: translateY(-50px);
    color: #1db954;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 500px;
  width: 100%;
  opacity: 10%;
  font-family: ${fonts.title};
  /* font-size: 44px; */
  background-image: url('images/vinyl.jpg');
  /* clip-path:  polygon(100% 0, 50% 50%, 100% 100%); */
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  /* animation: ${trackingInExpand} 1s linear; */
  text-shadow: 2px 2px 2px #5d7a67;
`;

const Woo = styled.h2`
  padding: 0 24px;
  animation: ${keyFrameMoveUp} 2s ease-in-out 0s;
  &:hover {
    /* animation: ${keyFrameMoveUp} 2s ease-in-out 0s; */
    /* color: #1db954; */
  }
`;

const SectionOne = () => {
  return (
    <Wrapper>
      <Title>
        <h2>People's Party Playlist</h2>
        <Woo>\o/</Woo>
      </Title>
    </Wrapper>
  );
};

export default SectionOne;
