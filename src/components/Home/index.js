import React from 'react';
import styled, { keyframes } from 'styled-components';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

import { colours, constants, fonts } from '../../styles.js';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-size: 100%;
`;


const Wrap = styled.div`
  height: 100%;
  font-family: ${fonts.font1};
  font-size: 44px;
  color: white;
`


const Parallax = styled.div`

   /* The image used */
  background-image: url('images/vinyl.jpg');
  /* Full height */
  height: 80vh;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;


  display:flex;
  justify-content:center;
  align-items:center;
`

const Static = styled.div`
  height: 80vh;
  /* background-color: red; */
  font-size:36px;
  /* background-color: rgba(0, 0, 0, 0.9); */
  width: 100%;
`

const keyFrameMoveUp = keyframes`
   50% {
    transform: translateY(-50px);
    color: #1db954;
  }
`;

// Section One
const Title = styled.div`
  display: flex;
  flex-direction: row;
  text-shadow: 2px 2px 2px #5d7a67;
  font-family: ${fonts.title};
  font-size: 44px;
  /* color: white; */
`;

const Woo = styled.h2`
  padding: 0 24px;
  animation: ${keyFrameMoveUp} 1s ease-in-out 0s;
  &:hover {
    /* animation: ${keyFrameMoveUp} 2s ease-in-out 0s; */
    /* color: #1db954; */
  }
`;

const Home = () => {
  return (
    // <Container>
    //   <SectionOne />
    //   <SectionTwo />
    //   <SectionThree />
    // </Container>
    <Wrap>
      <Parallax >
        <Title>
      <h2>People's Party Playlist</h2>
      <Woo>\o/</Woo>
          </Title>
      </Parallax>
      <Parallax >

      <Static >
        <SectionTwo />

        {/* </SectionTwo>
        <h1>Boring</h1> */}
      </Static>
      </Parallax>
      <Parallax >
      <SectionThree />
        {/* <h1>SO FWUFFY AWWW</h1> */}
      </Parallax>
    </Wrap>
  );
};

export default Home;
