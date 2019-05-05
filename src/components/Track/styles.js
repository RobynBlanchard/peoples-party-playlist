import styled, { keyframes, css } from 'styled-components';
import { media } from '../../styles.js';

export const Container = styled.div`
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
`;

export const DesktopDetails = styled.div`
  margin: 5px;
  width: 100%;
  display: block;
  display: flex;
  justify-content: space-between;

  ${media.tablet`display: none;`}
`;
export const Song = styled.p`
  width: 40%;
  padding: 0 10px;
`;

export const Artist = styled.p`
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
