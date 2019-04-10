import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colours, constants, fonts } from '../../styles.js';

import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-size: 100%;
  /* transform: translate(-50%, -50%); */
`;

const Home = () => {
  return (
    <Container>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </Container>
  );
};

export default Home;
