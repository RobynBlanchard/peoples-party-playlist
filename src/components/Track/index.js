import React from 'react';
import {
  Container,
  DesktopDetails,
  SongDesktop,
  ArtistDesktop,
  MobileDetails,
  SongMobile,
  ArtistMobile
} from './styles';

const trimText = (text, length) =>
  text.length > length ? `${text.slice(0, length)}...` : text;

const Track = ({ name, artist, children, isLocked, shouldFocus }) => {
  // const trimmedSong = trimText(name, 32);
  // const trimmedArtist = trimText(artist, 24);

  return (
    <Container lockedTrack={isLocked} shouldFocus={shouldFocus}>
      <DesktopDetails>
        <SongDesktop>{name}</SongDesktop>
        <ArtistDesktop>{artist}</ArtistDesktop>
      </DesktopDetails>

      <MobileDetails>
        <SongMobile>{name}</SongMobile>
        <ArtistMobile>{artist}</ArtistMobile>
      </MobileDetails>
      {children}
    </Container>
  );
};

export default Track;
