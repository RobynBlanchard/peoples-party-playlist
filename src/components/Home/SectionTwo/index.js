import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colours, constants, fonts } from '../../../styles.js';

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
height: 500px;
width: 100%;
background-color: ${colours.grey};
/* clip-path: polygon(50% 0%, 50% 0, 0 50%, 50% 100%, 0 100%, 0 0); */
`;

const Icon = styled.img`
height: 80px;
width: 80px;
padding: 20px 20px;
`;


const ContentBlock = styled.div`
/* display: flex;
align-items: center;
flex-direction: column; */
width: 200px;
height: 200px;
/* text-align: center; */
font-size: 20px;

/* testing */
/* border: 1px solid green; */
/* background-color: lightgreen; */
opacity: 10%;

transform-style: preserve-3d;
transition: all 1s linear;

&:hover {
  transform: rotateY(180deg);
  box-shadow: -5px 5px 5px #000;
}
`;

const ContentContainer = styled.div`
display: flex;
justify-content: space-around;
width: ${constants.mainContentContainerWidth};
height: 200px;
`;


const Front = styled.div`
backface-visibility: hidden;
/* background-color: #03230b; */

height: 100%;
width: 100%;

display: flex;
align-items: center;
justify-content: center;
position: absolute;

`;

const Back = styled.div`
height: 100%;

background-color: #03230b;

backface-visibility: hidden;

display: block;
transform: rotateY(180deg);
box-sizing: border-box;
padding: 10px;

display: flex;
align-items: center;
justify-content: center;
text-align: center;
`;

const SectionTwo = () => {
  return (
    <Wrapper>
        <ContentContainer>
          <ContentBlock>
            <Front>
              <Icon src="http://localhost:3000/images/disc.svg" />
            </Front>
            <Back>
              <p>Create your own playlist</p>
            </Back>
          </ContentBlock>
          <ContentBlock>
            <Front>
              <Icon src="http://localhost:3000/images/thumbs_up.svg" />
            </Front>
            <Back>
              <p>Upvote to move tracks up the playlist </p>
            </Back>
          </ContentBlock>
          <ContentBlock>
            <Front>
              <Icon src="http://localhost:3000/images/thumbs_down.svg" />
            </Front>
            <Back>
              <p>Downvote to move tracks down the playlist</p>
            </Back>
          </ContentBlock>
          <ContentBlock>
            <Front>
              <Icon src="http://localhost:3000/images/sad.svg" />
            </Front>
            <Back>
              <p>5 downvotes will remove the track from the playlist</p>
            </Back>
          </ContentBlock>
        </ContentContainer>
      </Wrapper>
  )
};

export default SectionTwo;