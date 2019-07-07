import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > p {
    text-align: center;
  }
`;

const ErrorIndicator = () => {
  return (
    <Wrapper>
      <p>
        Oops, something went wrong.
        <br />
        Try logging in again.
      </p>
    </Wrapper>
  );
};

export default ErrorIndicator;
