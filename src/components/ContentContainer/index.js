import React from 'react'
import styled from 'styled-components';
import { media } from '../../globalStyles';

const Container = styled.div`
  width: 70%;
  ${media.desktop`width: 95%;`}
`;

const ContentContainer = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default ContentContainer