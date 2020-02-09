import React from 'react';
import styled from 'styled-components';

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
  width: 100%;
  font-size: 24px;
`;

const TextWrapper = styled.div`
  text-align: center;
`;

const IconWrapper = styled.div`
  text-align: center;
`;

const SectionThree = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <p>Log in with Spotify to get started</p>
      </TextWrapper>
      <IconWrapper>
        <a href="/login">
          <Icon src="/images/log-in.svg" />
        </a>
      </IconWrapper>
    </Wrapper>
  );
};

export default SectionThree;
