import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { fonts, media } from '../../../styles';
import Mouse from './Mouse';

const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  -webkit-font-smoothing: antialiased;
  height: 70%;
  display: flex;
  justify-content: center;
  ${media.phone`text-align: center;`}
`;

const MainHeading = styled.h2`
  text-transform: uppercase;
  margin: 0px;
  text-shadow: 1px 1px 1px #000000;

  ${media.desktop`font-size: 54px;`}
  ${media.phone`font-size: 41px;`}
`;

const SubHeading = styled.p`
  text-transform: uppercase;
  margin: 0px;
  font-size: 24px;
  letter-spacing: 10px;
  text-shadow: 1px 1px 1px #000000;

  ${media.desktop`font-size: 16px;`}
  ${media.phone`font-size: 18px;`}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-around;
`;

const SectionOne = () => {
  return (
    <Container>
      <Title>
        <MainHeading>People's Party Playlist</MainHeading>
        <SubHeading>The Ultimate online jukebox experience</SubHeading>
      </Title>
      <Mouse />
    </Container>
  );
};

export default SectionOne;
