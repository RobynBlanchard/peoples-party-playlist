import React from 'react';
import styled from 'styled-components';

const ContentBlockWrapper = styled.div`
  width: 200px;
  height: 200px;
  font-size: 20px;
  opacity: 10%;

  transform-style: preserve-3d;
  transition: all 1s linear;

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
`;

const Back = styled.div`
  height: 100%;
  /* background-image: linear-gradient(to right bottom, #000000, #03230b); */
  background-color: #000000;
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
const Icon = styled.img`
  height: 80px;
  width: 80px;
  padding: 20px 20px;
`;

const ContentBlock = ({ image, text }) => {
  return (
    <ContentBlockWrapper>
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
