import React from 'react';
import styled from 'styled-components';
import { media } from '../../globalStyles';

const Container = styled.div`
  width: 70%;
  ${media.desktop`
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
`;

const ContentContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ContentContainer;
