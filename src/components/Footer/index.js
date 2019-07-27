import React from 'react';
import styled from 'styled-components';
import { colours } from '../globalStyles.js';

const FooterPlayer = styled.div`
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 50px;
  opacity: 0.8;
  background-color: ${colours.grey};
`;
const Icon = styled.img`
height: 50px;
width: 50px;
`;

const MusicPlayer = () => {
  return (
    <FooterPlayer>
      <Icon src="images/play.svg" />{' '}
    </FooterPlayer>
  );
};

export default MusicPlayer;
