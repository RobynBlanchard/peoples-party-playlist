import styled, { css } from 'styled-components';
import { media } from '../../styles.js';

export const Container = styled.li`
  list-style: none;
  border-bottom: solid 1px #333333;
  display: flex;
  justify-content: space-between;
  width: 100%;

  height: 50px;
  line-height: 2px;
  ${media.tablet`height: 80px;line-height: 10px;`}

  &:focus-within {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    background: rgba(177, 228, 86, 0.16);
    color: pink;
  }

  ${({ lockedTrack }) =>
    lockedTrack &&
    css`
      border: 1px solid grey;
      background-color: #87868614;
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
  width: 40%;
  padding: 0 10px;
`;

export const ArtistDesktop = styled.p`
  width: 30%;
`;

export const MobileDetails = styled.div`
  width: 80%;
  padding: 0 32px;
  display: none;
  ${media.tablet`display: block;`}
`;

export const SongMobile = styled.p`
  font-size: 24px;
`;

export const ArtistMobile = styled.p`
  color: grey;
  font-size: 20px;
`;
