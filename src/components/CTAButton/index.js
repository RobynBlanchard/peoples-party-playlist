import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

`;

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 24px;

  &:active > p {
    transform: scale(0.8);
  }

  &:after > p {
    transform: scale(1);
  }
`;



const CTAButton = ({handleClick, img, uri, name, artist}) => {
  return (
    <Wrapper>
      <Button onClick={() => handleClick(uri, name, artist)}>
        <p> + </p>
      </Button>
    </Wrapper>
  );
};

export default CTAButton;
