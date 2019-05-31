import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const sneakAPeek = keyframes`
  /* 10% {
    transition: rotateY(180deg);
  } */

  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`

const ContentBlockWrapper = styled.div`
  width: 200px;
  height: 200px;
  font-size: 20px;
  opacity: 10%;

  transform-style: preserve-3d;
  transition: all 1s linear;

  animation: ${props => (props.card === true) && sneakAPeek }  3.5s ease-in-out;

  border-radius: 8px;

  &:hover {
    transform: rotateY(180deg);
    box-shadow: -5px 5px 5px #000;
  }
`;

const Front = styled.div`
  backface-visibility: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  border-radius: 8px;

`;

const Back = styled.div`
  height: 100%;
  background-image: linear-gradient(to right bottom, #32333478, #000000);
  backface-visibility: hidden;
  display: block;
  transform: rotateY(180deg);
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  border-radius: 8px;

`;
const Icon = styled.img`
  height: 80px;
  width: 80px;
  padding: 20px 20px;
`;

const ContentBlock = ({ image, text, displayState, peekCard }) => {
  return (
    <ContentBlockWrapper card={peekCard && displayState}>
      <Front>
        <Icon src={`/images${image}`} />
      </Front>
      <Back>
        <p>{text}</p>
      </Back>
    </ContentBlockWrapper>
  );
};

export default ContentBlock;
