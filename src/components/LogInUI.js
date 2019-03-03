import React from 'react';
import styled from 'styled-components';

const LogIn = styled.a`
  border-right: none;
  background-color: #1db954;
  border-radius: 25px;

  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
`;

const LinkContainer = styled.div`
  height: 100%;
`;

const LogInUI = ({ href, text }) => {
  return (
    <LinkContainer>
      <LogIn href={href}>{text}</LogIn>
    </LinkContainer>
  );
};

export default LogInUI;
