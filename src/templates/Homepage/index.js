import React from 'react';
import styled from 'styled-components';
import Title from './Sections/Title';
import RotatingCards from './Sections/RotatingCards';
import SignIn from './Sections/SignIn';
import { fonts, colours } from '../../globalStyles';

const Wrap = styled.div`
  height: 100%;
  font-family: ${fonts.font1};
  font-size: 44px;
  color: ${colours.spotifyWhite};
`;

const Parallax = styled.div`
  background-image: linear-gradient(to right bottom, #212121, #000000);
  min-height: 450px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Static = styled.div`
  min-height: 350px;
  font-size: 36px;
  width: 100%;
`;

class HomePage extends React.Component {
  render() {
    return (
      <Wrap>
        <Parallax>
          <Title />
        </Parallax>
        <Parallax>
          <Static>
            <RotatingCards />
          </Static>
        </Parallax>
        <Parallax>
          <SignIn />
        </Parallax>
      </Wrap>
    );
  }
}

export default HomePage;
