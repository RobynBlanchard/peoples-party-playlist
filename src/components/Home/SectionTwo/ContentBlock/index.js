import React from 'react';
import styled, { keyframes } from 'styled-components';

const sneakAPeekFront = keyframes`
  50% {
    transform: rotateY(-180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`;

const sneakAPeekBack = keyframes`
  50% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

const Card = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right bottom, #32333478, #000000);
  transition: all 1s linear;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1.5rem 4rem rgba(black, 0.15);
`;

const Back = styled(Card)`
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  animation: ${props => props.card === true && sneakAPeekBack} 3.5s ease-in-out;
`;

const Front = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${props => props.card === true && sneakAPeekFront} 3.5s ease-in-out;
`;

const ContentBlockWrapper = styled.div`
  perspective: 500px;
  -moz-perspective: 500px;
  position: relative;
  height: 200px;
  width: 200px;
  font-size: 20px;
  opacity: 10%;

  &:hover ${Front} {
    transform: rotateY(-180deg);
  }

  &:hover ${Back} {
    transform: rotateY(0);
  }
`;

const Icon = styled.img`
  height: 80px;
  width: 80px;
  padding: 20px 20px;
`;

const ContentBlock = ({ image, text, displayState, peekCard }) => {
  return (
    <ContentBlockWrapper card={peekCard && displayState}>
      <Front card={peekCard && displayState}>
        <Icon src={`/images${image}`} />
      </Front>
      <Back card={peekCard && displayState}>
        <p>{text}</p>
      </Back>
    </ContentBlockWrapper>
  );
};

export default ContentBlock;
