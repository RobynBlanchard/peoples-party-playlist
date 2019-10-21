import styled, { keyframes } from 'styled-components';
import { media, fonts, colours } from '../../globalStyles';

const lightHighlight = keyframes`
  50% {
    color: ${colours.spotifyGreen};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const VotesText = styled.p`
  padding: 0 10px;
  width: 20px;
  text-align: center;
  color: white;
  font-family: ${fonts.font1};
  ${media.tablet`font-size: 18px;`}
  animation: ${({ shouldFocus }) => shouldFocus && lightHighlight} 1s
    ease-in-out;
`;

export const Icon = styled.img`
  height: 20px;
  width: 20px;

  ${media.tablet`height: 24px;width: 24px;`}
`;
