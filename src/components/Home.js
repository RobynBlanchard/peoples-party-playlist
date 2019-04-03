import React from 'react';
import styled from 'styled-components';
import { colours, constants } from '../styles.js';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SectionOne = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 500px;
  width: 100%;
  background-color: ${colours.spotifyBlack};
  font-family: 'Righteous', cursive;
  font-size: 44px;
`;

const SectionTwo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
  background-color: ${colours.grey};
`;
const SectionThree = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 500px;
  width: 100%;
  font-size: 24px;
`;

const Icon = styled.img`
  height: 40px;
  width: 40px;
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

const ContentBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  text-align: center;
  font-size: 16px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: ${constants.mainContentContainerWidth};
  height: 200px;
`;

const Home = () => {
  return (
    <Container>
      <SectionOne>People's Party Playlist \o/</SectionOne>
      <SectionTwo>
        <ContentContainer>
          <ContentBlock>
            <Icon src="http://localhost:3000/images/disc.svg" />
            Create your own playlist
          </ContentBlock>
          <ContentBlock>
            <Icon src="http://localhost:3000/images/thumbs_up.svg" />
            Upvote to move tracks up the playlist
          </ContentBlock>
          <ContentBlock>
            <Icon src="http://localhost:3000/images/thumbs_down.svg" />
            Downvote to move tracks down the playlist
          </ContentBlock>
          <ContentBlock>
            <Icon src="http://localhost:3000/images/sad.svg" />5 downvotes will
            remove the track from the playlist
          </ContentBlock>
        </ContentContainer>
      </SectionTwo>
      <SectionThree>
        Log in with Spotify to get started
        <a href="/login">
          <Icon
            className="hover-grow"
            src="http://localhost:3000/images/log-in.svg"
          />
        </a>
      </SectionThree>
    </Container>
  );
};

export default Home;
