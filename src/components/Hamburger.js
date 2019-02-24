import React from 'react';
import styled from 'styled-components';

const Line = styled.div`
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
`;

const MenuContainer = styled.div`
  padding: 10px;
`;

const Hamburger = () => {
  return (
    <MenuContainer>
      <Line></Line>
      <Line></Line>
      <Line></Line>
    </MenuContainer>
  );
};

export default Hamburger;