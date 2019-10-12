import React from 'react';
import styled from 'styled-components';
import { DefaultButton } from '../../globalStyles';

const Container = styled.div`
  display: flex;
  align-items: row;
`;

const Icon = styled.img`
  height: 40px;
  width: 40px;
  padding: 16px;
`;

const Heading = ({ text, img, handleClick }) => {
  return (
    <Container>
      <DefaultButton onClick={handleClick}>
        <Icon src={img} />
      </DefaultButton>
      <h2>{text}</h2>{' '}
    </Container>
  );
};

export default Heading;
