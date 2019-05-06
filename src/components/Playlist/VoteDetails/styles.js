import styled, { keyframes, css } from 'styled-components';
import { media } from '../../../styles.js/index.js';

export const VotesContent = styled.div`
  ${media.tablet`width: 10%;padding: 0 32px;`}

  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const VotesText = styled.p`
  padding: 10px;
  width: 20px;
  text-align: center;

  ${media.tablet`font-size: 20px;`}
`;

export const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const Icon = styled.img`
  height: 20px;
  width: 20px;

  ${media.tablet`height: 32px;width: 32px;`}
`;
