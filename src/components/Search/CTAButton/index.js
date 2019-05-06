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
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

const CTAButton = ({handleClick, img, uri}) => {
  return (
    <Wrapper>
      <Button onClick={() => handleClick(uri)}>
        <Icon src={`images/${img}.svg`} />
      </Button>
    </Wrapper>
  );
};

export default CTAButton;
