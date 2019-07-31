import styled, { css, animation, keyframes } from 'styled-components';
import { media, colours } from '../../globalStyles';

const highlight = keyframes`
  50% {
    color: green
  }

  /* 100% {
    border: 10px solid red
  } */
`

export const Container = styled.li`
  list-style: none;
  border-bottom: solid 1px #424242;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 8px;
  opacity: 0.9;

  height: 50px;
   line-height: 2px;
  /* ${media.tablet`height: 80px;line-height: 1;`} */
  animation: ${props => props.shouldFocus && highlight} 1s ease-in-out;


  ${({ lockedTrack }) =>
    lockedTrack &&
    css`
      border: 1px solid grey;
      /* background-color: #87868614; */
      background-color: ${colours.primaryDark};
      border-radius: 24px;
      box-shadow: white;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 1);
    `}}
`;

export const DesktopDetails = styled.div`
  margin: 5px;
  width: 100%;
  display: block;
  display: flex;
  justify-content: space-between;
  padding-top: 5px;

  ${media.tablet`display: none;`}
`;
export const SongDesktop = styled.p`
  padding: 0 10px;
`;

export const ArtistDesktop = styled.p`
  width: 30%;
`;

export const MobileDetails = styled.div`
  width: 80%;
  padding: 0 8px;
  display: none;
  ${media.tablet`display: block;`}

  white-space: nowrap;
  overflow: hidden;
`;

export const SongMobile = styled.p`
  margin: 8px 0;
  line-height: 1;
`;

export const ArtistMobile = styled.p`
  color: grey;
  font-size: 16px;
  margin: 8px 0;
`;
