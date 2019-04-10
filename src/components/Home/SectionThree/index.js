import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colours, constants, fonts } from '../../../styles.js';

const Icon = styled.img`
  height: 60px;
  width: 60px;
  padding: 20px 20px;

  &.hover-grow {
    transition-duration: 0.3s;

    &:hover {
      transform: scale(1.5);
    }

    &:focus {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1.1);
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 500px;
  width: 100%;
  font-size: 24px;
  background-color: ${colours.spotifyBlack};
  /* clip-path: polygon(50% 0, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 0); */
`;

const SectionThree = () => {
  return (
    <Wrapper>
      Log in with Spotify to get started
      <a href="/login">
        <Icon
          className="hover-grow"
          src="http://localhost:3000/images/log-in.svg"
        />
      </a>
    </Wrapper>
  );
};

export default SectionThree;
