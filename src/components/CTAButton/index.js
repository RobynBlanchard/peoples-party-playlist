import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 24px;

  height: 20px;

  & > p {
    line-height: 0;
    padding: 0;
    margin: 0;
  }

  &:active > p {
    transform: scale(0.8);
  }

  &:after > p {
    transform: scale(1);
  }
`;

const CTAButton = ({ handleClick, img, uri, name, artist }) => {
  return (
    <Button onClick={() => handleClick(uri, name, artist)}>
      <p> + </p>
    </Button>
  );
};

export default CTAButton;
