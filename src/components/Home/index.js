import React from 'react';
import styled from 'styled-components';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

import { fonts, colours } from '../../styles';

const Wrap = styled.div`
  height: 100%;
  font-family: ${fonts.font1};
  font-size: 44px;
  color: ${colours.spotifyWhite};
`;

const Parallax = styled.div`
  background-image: url('images/vinyl.jpg');
  height: 85vh;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Static = styled.div`
  height: 80vh;
  font-size: 36px;
  width: 100%;
`;

class Home extends React.Component {
  render() {
    return (
      <Wrap>
        <Parallax>
          <SectionOne />
        </Parallax>
        <Parallax>
          <Static>
            <SectionTwo />
          </Static>
        </Parallax>
        <Parallax>
          <SectionThree />
        </Parallax>
      </Wrap>
    );
  }
}

export default Home;
