import React from 'react';
import styled from 'styled-components';
import { colours, constants } from '../../../styles.js';
import ContentBlock from './ContentBlock';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 500px;
  width: 100%;
  background-color: ${colours.grey};
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: ${constants.mainContentContainerWidth};
  height: 200px;
`;

const SectionTwo = () => {
  const content = [
    {
      image: '/disc.svg',
      text: 'Create your own playlist'
    },
    {
      image: '/thumbs_up.svg',
      text: 'Upvote to move tracks up the playlist'
    },
    {
      image: '/thumbs_down.svg',
      text: 'Downvote to move tracks down the playlist'
    },
    {
      image: '/sad.svg',
      text: '5 downvotes will remove the track from the playlist'
    }
  ];
  return (
    <Wrapper>
      <ContentContainer>
        {content.map(block => {
          return <ContentBlock image={block.image} text={block.text} key={block.text} />;
        })}
      </ContentContainer>
    </Wrapper>
  );
};

export default SectionTwo;
