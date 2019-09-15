import styled, { keyframes } from 'styled-components';
import { media, colours } from '../../globalStyles';

const lightHighlight = keyframes`
  50% {
    color: ${colours.spotifyGreen};
  }
`;

const darkHighlight = keyframes`
  50% {
    color: ${colours.darkGreen};
  }
`;

export const MobileRow = styled.tr`
  display: none;
  ${media.tablet`display:table-row;`}
  height: 50px;

  width: 100%;
  animation: ${({ shouldFocus }) => shouldFocus && lightHighlight} 1s
    ease-in-out;
`;

export const DesktopRow = styled.tr`
  display: table-row;
  ${media.tablet`display:none;`}
  height: 50px;
  width: 100%;
  animation: ${({ shouldFocus }) => shouldFocus && lightHighlight} 1s
    ease-in-out;
`;

export const Cell = styled.td`
  ${media.tablet`width: 90%; padding: 0;`}
  padding: 0 12px 0 12px;
  border-bottom: ${({ hasBorder }) => hasBorder && 'solid 1px #424242'};
  line-height: 1;
`;

export const NameCell = styled(Cell)`
  width: 55%;
`;
export const ArtistCell = styled(Cell)`
  width: 35%;
`;
export const CTACell = styled(Cell)`
  width: 10%;
`;

export const MobileName = styled.p`
  line-height: 0;
  margin: 0;
  padding: 0;
`;

export const MobileArtist = styled.p`
  line-height: 0;
  margin: 0;
  padding: 0;
  color: grey;
  animation: ${({ shouldFocus }) => shouldFocus && darkHighlight} 1s ease-in-out;
`;
