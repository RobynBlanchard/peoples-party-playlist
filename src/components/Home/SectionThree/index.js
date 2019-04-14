import React from 'react';
import styled from 'styled-components';
import { colours } from '../../../styles.js';

const Icon = styled.img`
  height: 60px;
  width: 60px;
  padding: 20px 20px;

  &:hover {
    transform: scale(1.5);
    transition-duration: 0.3s;
  }

  &:active {
    transform: scale(1.1);
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
  /* background-color: ${colours.spotifyBlack}; */
`;

const SectionThree = () => {
  return (
    <Wrapper>
      <p>Log in with Spotify to get started</p>
      <a href="/login">
        <Icon src="/images/log-in.svg" />
      </a>
    </Wrapper>
  );
};

export default SectionThree;
