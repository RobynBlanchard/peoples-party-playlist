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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 500px;
  width: 100%;
  /* background-color: ${colours.spotifyBlack}; */
  opacity: 10%;
  font-family: ${fonts.title};
  font-size: 44px;
  /* background-image: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.18),
      rgba(0, 0, 0, 0.84)
    ), url('images/vinyl.jpg') */
  background-image: url('images/vinyl.jpg');
  /* background-image: url('images/tall-jukebox.jpg');
  background-size: 0 100%; */
  /* clip-path:  polygon(100% 0, 50% 50%, 100% 100%); */

`;

const Img = styled.img`
  /* background-image: url('images/tall-jukebox.jpg'); */
  /* height: 700px; */
  width: 100%;
  clip-path: polygon(100% 0, 50% 50%, 100% 100%);
`;

const Title = styled.div`
  animation: ${keyFrameMoveInLeft} 2s ease-in-out 0s;
  display: flex;
  flex-direction: row;
`;

const Woo = styled.h2`
  padding: 0 24px;
  &:hover {
    transform: scaleY(1.5);
    color: #1db954;
  }
`;

const SectionOne = () => {
  return (
    <Wrapper>
      <Title>
        <h2>People's Party Playlist</h2>
        <Woo>\o/</Woo>
        {/* <Img src="images/tall-jukebox.jpg" /> */}
        {/* <Img src="images/vinyl.jpg" /> */}
      </Title>
    </Wrapper>
  );
};

export default SectionOne;
